import { Editor, type EditorProps } from "@bytemd/react";
import zh_Hans from "bytemd/locales/zh_Hans.json";
import { fetchUploadFileToCOS } from "@/api/file";

import { plugins } from "./config";

interface BytemdEditorProps {
  body?: string;
  setContent: (body: string) => void;
  editorProps?: Partial<EditorProps>;
}

export const BytemdEditor = ({
  body,
  setContent,
  editorProps,
}: BytemdEditorProps) => {
  // 处理图片上传
  const handleUploadImages = async (files: File[]) => {
    const uploadPromises = files.map(async (file) => {
      try {
        const res: any = await fetchUploadFileToCOS(file);
        return {
          url: res.data?.fileUrl || "",
          title: res.data?.filename || file.name,
        };
      } catch (error: any) {
        console.log("🚀 ~ handleUploadImages ~ error:", error);
        return {
          url: "",
          title: file.name,
        };
      }
    });
    return Promise.all(uploadPromises);
  };

  return (
    <Editor
      value={body ?? ""}
      plugins={plugins}
      placeholder="请输入内容..."
      onChange={(v) => {
        setContent(v);
      }}
      locale={zh_Hans}
      uploadImages={handleUploadImages}
      editorConfig={{
        ...editorProps,
      }}
    />
  );
};
