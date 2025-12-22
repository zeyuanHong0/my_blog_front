export interface CreateCategory {
  name: string;
}

export interface UpdateCategory extends CreateCategory {
  id: string;
}

export interface CategoryPageListParams {
  name?: string;
  pageNum: number;
  pageSize: number;
}
