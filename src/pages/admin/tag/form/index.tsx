import {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useCallback,
  useState,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { fetchTagDetail, fetchCreateTag, fetchUpdateTag } from "@/api/tag";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
} from "@/components/toast";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "名称至少需要 1 个字符" })
    .max(10, { message: "名称不能超过 10 个字符" }),
  icon: z.string().min(1, { message: "图标至少需要 1 个字符" }),
});

export interface TagFormRef {
  handleShowForm: () => void;
}

interface TagFormProps {
  formType: "create" | "edit";
  tagId?: string | null;
  refreshList: () => void;
}

const TagForm = forwardRef<TagFormRef, TagFormProps>(
  ({ formType, tagId, refreshList }, ref) => {
    const [dialogTitle, setDialogTitle] = useState("创建标签");
    const [confirmBtnText, setConfirmBtnText] = useState("创建");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [previewSvg, setPreviewSvg] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
      if (formType === "create") {
        setDialogTitle("创建标签");
        setConfirmBtnText("创建");
      } else if (formType === "edit") {
        setDialogTitle("编辑标签");
        setConfirmBtnText("保存");
      }
    }, [formType]);

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        icon: "",
      },
    });

    const handleShowForm = () => {
      // 重置校验
      form.reset();
      setPreviewSvg(""); // 清空预览
      setIsDialogOpen(true);
    };

    const handleCancel = () => {
      setIsDialogOpen(false);
    };

    // 获取标签数据
    const handleGetTagInfo = useCallback(async () => {
      if (!tagId) {
        showWarningToast("标签ID不存在，无法获取标签信息");
        return;
      }
      try {
        const res = await fetchTagDetail(tagId);
        form.setValue("name", res.data.name);
        form.setValue("icon", res.data.icon);
        setPreviewSvg(res.data.icon);
      } catch (error: any) {
        showErrorToast(error.message || "获取标签信息失败");
      }
    }, [tagId, form]);

    useEffect(() => {
      if (isDialogOpen && formType === "edit") {
        handleGetTagInfo();
      }
    }, [isDialogOpen, formType, handleGetTagInfo]);

    // 提交表单
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        if (formType === "create") {
          // 创建标签
          await fetchCreateTag(values);
          showSuccessToast("标签创建成功");
        } else {
          // 更新标签
          if (!tagId) {
            showWarningToast("标签ID不存在，无法更新标签");
            return;
          }
          await fetchUpdateTag({ id: tagId, ...values });
          showSuccessToast("标签更新成功");
        }
        setIsDialogOpen(false);
        refreshList();
      } catch (error: any) {
        showErrorToast(
          error.message || `${formType === "create" ? "创建" : "更新"}标签失败`,
        );
      } finally {
        setIsSubmitting(false);
      }
    };

    const previewIcon = () => {
      const svgString = form.getValues("icon");
      if (svgString.trim()) {
        setPreviewSvg(svgString);
      }
    };

    useImperativeHandle(ref, () => ({
      handleShowForm,
    }));

    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="max-h-[90vh] max-w-[90%] overflow-y-auto sm:max-w-lg"
        >
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-6"
              autoComplete="off"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* 名称 */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>名称</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入名称" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 图标 */}
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>图标</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-32"
                        placeholder="请输入一个图标SVG字符串"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    {/* 预览按钮 */}
                    <Button
                      type="button"
                      className="w-full"
                      onClick={previewIcon}
                    >
                      预览
                    </Button>
                    {/* SVG预览区域 */}
                    {previewSvg && (
                      <div className="mt-4 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6">
                        <div
                          className="flex h-20 w-20 items-center justify-center"
                          dangerouslySetInnerHTML={{ __html: previewSvg }}
                        />
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              取消
            </Button>
            <Button
              className="bg-black text-white"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "提交中..." : confirmBtnText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

TagForm.displayName = "TagForm";

export default TagForm;
