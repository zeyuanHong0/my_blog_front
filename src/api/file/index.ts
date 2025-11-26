import request from "@/utils/axios";

enum API {
  UPLOAD_URL = "/upload/file",
  UPLOAD_FILE_COS = "/upload/fileToCos",
}

// 上传文件
export const fetchUploadFile = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return request.post<any, any>(API.UPLOAD_URL, formData);
};

// 上传文件到 COS
export const fetchUploadFileToCOS = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return request.post<any, any>(API.UPLOAD_FILE_COS, formData);
};
