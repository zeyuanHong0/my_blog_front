import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { fetchAllTags } from "@/api/tag";
import { fetchAllCategories } from "@/api/category";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MultiSelect from "@/components/multi-select";
import { BytemdEditor } from "@/components/bytemd/editor";
import CustomSelect from "@/components/base/custom-select";

const formSchema = z.object({
  title: z.string().min(1, { message: "长度不能少于1个字符" }),
  description: z.string().min(1, { message: "长度不能少于1个字符" }),
  content: z.string().min(1, { message: "长度不能少于1个字符" }),
  published: z.boolean().optional(),
  tags: z.string().array().min(1, { message: "至少选择一个标签" }).optional(),
  category: z.string().min(1, { message: "请选择分类" }).optional(),
  aiSummary: z.string().optional(),
});

type TagOption = {
  label: string;
  value: string;
};

type CategoryOption = {
  label: string;
  value: string;
};

export type BlogFormRef = {
  submit: () => void;
};

interface BlogFormProps {
  getFormValues: (values: z.infer<typeof formSchema>) => void;
  initialValues?: Partial<z.infer<typeof formSchema>> & { id?: string };
}

const AdminBlogForm = forwardRef<BlogFormRef, BlogFormProps>(
  ({ getFormValues, initialValues }, ref) => {
    const [isReady, setIsReady] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        description: "",
        content: "",
        published: true,
        tags: [],
        category: "",
        aiSummary: "",
      },
    });
    const onSubmit = () => {
      console.log("提交数据:", form.getValues());
      getFormValues(form.getValues());
    };

    // 暴露提交方法给父组件
    useImperativeHandle(ref, () => ({
      submit: () => {
        form.handleSubmit(onSubmit)();
      },
    }));

    const [tagList, setTagList] = useState<TagOption[]>([]);
    // 获取所有标签
    const handleGetAllTags = async () => {
      const res = await fetchAllTags();
      const tags = res.data.map((tag: any) => ({
        label: tag.name,
        value: tag.id,
      }));
      setTagList(tags);
    };
    const [categoryList, setCategoryList] = useState<CategoryOption[]>([]);
    // 获取所有分类
    const handleGetAllCategories = async () => {
      const res = await fetchAllCategories();
      const categories = res.data.map((category: any) => ({
        label: category.name,
        value: category.id,
      }));
      setCategoryList(categories);
    };

    useEffect(() => {
      Promise.all([handleGetAllTags(), handleGetAllCategories()]).then(() => {
        setIsReady(true);
      });
    }, []);

    useEffect(() => {
      if (isReady && initialValues) {
        form.reset({ ...form.getValues(), ...initialValues });
      }
      // form对象在生命周期内是稳定的
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReady, initialValues]);

    return (
      <Form {...form}>
        <form
          className="space-y-6 px-1 pb-24"
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* 标题 */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>标题</FormLabel>
                <FormControl>
                  <Input placeholder="请输入标题" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 描述 */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>描述</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="请输入描述"
                    className="min-h-[60px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 分类 */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>分类</FormLabel>
                <FormControl>
                  <CustomSelect
                    className="w-48"
                    list={categoryList}
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 标签 */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>标签</FormLabel>
                <FormControl>
                  <MultiSelect
                    value={field.value || []}
                    onChange={field.onChange}
                    options={tagList}
                    placeholder="请选择标签"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 发布状态 */}
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem>
                <FormLabel>是否发布</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* AI总结 */}
          {initialValues?.id && (
            <FormField
              control={form.control}
              name="aiSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI总结</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="如需重新生成AI总结，可先清空此内容"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* 内容 */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>内容</FormLabel>
                <FormControl>
                  <div>
                    <BytemdEditor
                      body={field.value}
                      setContent={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  },
);

AdminBlogForm.displayName = "AdminBlogForm";

export default AdminBlogForm;
