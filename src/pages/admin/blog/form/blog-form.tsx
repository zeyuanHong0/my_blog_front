import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { fetchAllTags } from "@/api/tag";

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
import { showErrorToast } from "@/components/toast";
import { Tag } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, { message: "长度不能少于1个字符" }),
  description: z.string().min(1, { message: "长度不能少于1个字符" }),
  content: z.string().min(1, { message: "长度不能少于1个字符" }),
  published: z.boolean().optional(),
  tags: z.string().array().min(1, { message: "至少选择一个标签" }).optional(),
});

type TagOption = {
  label: string;
  value: string;
};

const AdminBlogForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      published: true,
      tags: [],
    },
  });
  const onSubmit = () => {
    console.log("提交数据:", form.getValues());
  };

  const options = [
    { label: "Vue", value: "vue" },
    { label: "React", value: "react" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ];
  const [tagList, setTagList] = useState<TagOption[]>([]);
  // 获取所有标签
  const handleGetAllTags = async () => {
    try {
      const res = await fetchAllTags();
      const tags = res.data.map((tag: any) => ({
        label: tag.name,
        value: tag.id,
      }));
      setTagList(tags);
    } catch (error: any) {
      showErrorToast(error.message || "获取标签列表失败");
    }
  };
  useEffect(() => {
    handleGetAllTags();
  }, []);

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
};
export default AdminBlogForm;
