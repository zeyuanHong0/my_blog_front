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

import { fetchTagDetail } from "@/api/tag";

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
}

const TagForm = forwardRef<TagFormRef, TagFormProps>(
  ({ formType, tagId }, ref) => {
    const [dialogTitle, setDialogTitle] = useState("创建标签");
    const [confirmBtnText, setConfirmBtnText] = useState("创建");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [previewSvg, setPreviewSvg] = useState<string>("");

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
        // const res = await fetchTagDetail(tagId);
        const res = {
          data: {
            name: "测试标签",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#f4f2ee" rx="60"/><path fill="#41b883" d="M182 50h36l-90 155.25L38 50h68.85L128 86l20.7-36z"/><path fill="#41b883" d="m38 50l90 155.25L218 50h-36l-54 93.15L73.55 50z"/><path fill="#35495e" d="M73.55 50L128 143.6L182 50h-33.3L128 86l-21.15-36z"/></g></svg>',
          },
        };
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

    const onSubmit = (values: z.infer<typeof formSchema>) => {
      console.log("提交表单", values);
      showSuccessToast("标签保存成功");
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
            <Button variant="outline" onClick={handleCancel}>
              取消
            </Button>
            <Button
              className="bg-black text-white"
              onClick={form.handleSubmit(onSubmit)}
            >
              {confirmBtnText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

TagForm.displayName = "TagForm";

export default TagForm;
