export interface CreateBlog {
  title: string;
  description: string;
  tagIds: string[];
  published: number; // 0: 草稿, 1: 已发布
  content: string;
}

export interface UpdateBlog extends CreateBlog {
  id: string;
}

export interface BlogPageListParams {
  title?: string;
  pageNum: number;
  pageSize: number;
}
