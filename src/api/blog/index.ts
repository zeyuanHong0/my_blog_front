import axios from "@/utils/axios";

import type { CreateBlog, UpdateBlog, BlogPageListParams } from "./types";

export * from "./types";

enum API {
  BLOG_ADD = "/blog/createBlog",
  BLOG_UPDATE = "/blog/updateBlog",
  BLOG_ALL_LIST = "/blog/getAllBlogList",
  BLOG_LIST_BY_PAGE = "/blog/getBlogListByPage",
  BLOG_INFO = "/blog/getBlogInfo",
  BLOG_DELETE = "/blog/deleteBlog",
}

/**
 * 创建博客
 * @param data 博客数据
 * @returns 创建结果
 */
export const fetchCreateBlog = (data: CreateBlog) => {
  return axios.post(API.BLOG_ADD, data);
};

/**
 * 更新博客
 * @param data 博客数据
 * @returns 更新结果
 */
export const fetchUpdateBlog = (data: UpdateBlog) => {
  return axios.put(API.BLOG_UPDATE, data);
};

/**
 * 获取分页博客列表
 * @param params 分页参数
 * @returns 分页博客列表
 */
export const fetchBlogsByPage = (params: BlogPageListParams) => {
  return axios.get(API.BLOG_LIST_BY_PAGE, { params });
};

/**
 * 获取博客详情
 * @param id 博客ID
 * @returns 博客详情
 */
export const fetchBlogDetail = (id: string) => {
  return axios.get(`${API.BLOG_INFO}/${id}`);
};

/** * 删除博客
 * @param id 博客ID
 * @returns 删除结果
 */
export const fetchDeleteBlog = (id: string) => {
  return axios.delete(`${API.BLOG_DELETE}/${id}`);
};
