import axios from "@/utils/axios";

import type {
  CreateCategory,
  UpdateCategory,
  CategoryPageListParams,
} from "./types";

export * from "./types";

enum API {
  CATEGORY_ADD = "/category/createCategory",
  CATEGORY_UPDATE = "/category/updateCategory",
  CATEGORY_ALL_LIST = "/category/getAllCategoryList",
  CATEGORY_LIST_BY_PAGE = "/category/getCategoryListByPage",
  CATEGORY_INFO = "/category/getCategoryInfo",
  CATEGORY_DELETE = "/category/deleteCategory",
  CATEGORY_FRONT_ALL_LIST = "/front/category/getAllCategoryList",
  CATEGORY_FRONT_INFO = "/front/category/getCategoryInfo",
}

/**
 * 创建分类
 * @param data 分类数据
 * @returns 创建结果
 */
export const fetchCreateCategory = (data: CreateCategory) => {
  return axios.post(API.CATEGORY_ADD, data);
};

/**
 * 更新分类
 * @param data 分类数据
 * @returns 更新结果
 */
export const fetchUpdateCategory = (data: UpdateCategory) => {
  return axios.put(API.CATEGORY_UPDATE, data);
};

/**
 * 获取所有分类列表
 * @returns 分类列表
 */
export const fetchAllCategories = () => {
  return axios.get(API.CATEGORY_ALL_LIST);
};

/**
 * 获取所有分类列表(无需鉴权)
 * @returns 分类列表
 */
export const fetchFrontAllCategories = () => {
  return axios.get(API.CATEGORY_FRONT_ALL_LIST);
};

/**
 * 获取分页分类列表
 * @param params 分页参数
 * @returns 分页分类列表
 */
export const fetchCategoriesByPage = (params: CategoryPageListParams) => {
  return axios.get(API.CATEGORY_LIST_BY_PAGE, { params });
};

/**
 * 获取分类详情
 * @param id 分类ID
 * @returns 分类详情
 */
export const fetchCategoryDetail = (id: string) => {
  return axios.get(`${API.CATEGORY_INFO}/${id}`);
};

/**
 * 获取分类详情(无需鉴权)
 * @param id 分类ID
 * @returns 分类详情
 */
export const fetchFrontCategoryDetail = (id: string) => {
  return axios.get(`${API.CATEGORY_FRONT_INFO}/${id}`);
};

/** * 删除分类
 * @param id 分类ID
 * @returns 删除结果
 */
export const fetchDeleteCategory = (id: string) => {
  return axios.delete(`${API.CATEGORY_DELETE}/${id}`);
};
