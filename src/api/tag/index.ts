import axios from "@/utils/axios";

import type { CreateTag, UpdateTag, TagPageListParams } from "./types";

export * from "./types";

enum API {
  TAG_ADD = "/tag/createTag",
  TAG_UPDATE = "/tag/updateTag",
  TAG_ALL_LIST = "/tag/getAllTagList",
  TAG_LIST_BY_PAGE = "/tag/getTagListByPage",
  TAG_INFO = "/tag/getTagInfo",
  TAG_DELETE = "/tag/deleteTag",
}

/**
 * 创建标签
 * @param data 标签数据
 * @returns 创建结果
 */
export const fetchCreateTag = (data: CreateTag) => {
  return axios.post(API.TAG_ADD, data);
};

/**
 * 更新标签
 * @param data 标签数据
 * @returns 更新结果
 */
export const fetchUpdateTag = (data: UpdateTag) => {
  return axios.put(API.TAG_UPDATE, data);
};

/**
 * 获取所有标签列表
 * @returns 标签列表
 */
export const fetchAllTags = () => {
  return axios.get(API.TAG_ALL_LIST);
};

/**
 * 获取分页标签列表
 * @param params 分页参数
 * @returns 分页标签列表
 */
export const fetchTagsByPage = (params: TagPageListParams) => {
  return axios.get(API.TAG_LIST_BY_PAGE, { params });
};

/**
 * 获取标签详情
 * @param id 标签ID
 * @returns 标签详情
 */
export const fetchTagDetail = (id: string) => {
  return axios.get(`${API.TAG_INFO}/${id}`);
};

/** * 删除标签
 * @param id 标签ID
 * @returns 删除结果
 */
export const fetchDeleteTag = (id: string) => {
  return axios.delete(`${API.TAG_DELETE}/${id}`);
};
