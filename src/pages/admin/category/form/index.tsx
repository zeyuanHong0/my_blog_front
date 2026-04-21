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

import {
  fetchCategoryDetail,
  fetchCreateCategory,
  fetchUpdateCategory,
} from "@/api/category";

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
import { Button } from "@/components/ui/button";
import { showSuccessToast, showWarningToast } from "@/components/toast";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "名称至少需要 1 个字符" })
    .max(6, { message: "名称不能超过 6 个字符" }),
});

export interface CategoryFormRef {
  handleShowForm: () => void;
}

interface CategoryFormProps {
  formType: "create" | "edit";
  categoryId?: string | null;
  refreshList: () => void;
}

const CategoryForm = forwardRef<CategoryFormRef, CategoryFormProps>(
  ({ formType, categoryId, refreshList }, ref) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dialogTitle = formType === "create" ? "创建分类" : "编辑分类";
    const confirmBtnText = formType === "create" ? "创建" : "保存";

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
      },
    });

    const handleShowForm = () => {
      // 重置校验
      form.reset();
      setIsDialogOpen(true);
    };

    const handleCancel = () => {
      setIsDialogOpen(false);
    };

    // 获取详情
    const handleGetCategoryInfo = useCallback(async () => {
      if (!categoryId) {
        showWarningToast("分类ID不存在，无法获取分类信息");
        return;
      }
      const res = await fetchCategoryDetail(categoryId);
      form.setValue("name", res.data.name);
    }, [categoryId, form]);

    useEffect(() => {
      if (isDialogOpen && formType === "edit") {
        handleGetCategoryInfo();
      }
    }, [isDialogOpen, formType, handleGetCategoryInfo]);

    // 提交表单
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        if (formType === "create") {
          // 创建分类
          await fetchCreateCategory(values);
          showSuccessToast("分类创建成功");
        } else {
          // 更新分类
          if (!categoryId) {
            showWarningToast("分类ID不存在，无法更新分类");
            return;
          }
          await fetchUpdateCategory({ id: categoryId, ...values });
          showSuccessToast("分类更新成功");
        }
        setIsDialogOpen(false);
        refreshList();
      } catch (error: any) {
        console.log("🚀 ~ onSubmit ~ error:", error);
      } finally {
        setIsSubmitting(false);
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
              className="bg-primary text-background hover:bg-primary/90"
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

CategoryForm.displayName = "CategoryForm";

export default CategoryForm;
