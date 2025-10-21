export interface CreateTag {
  name: string;
  icon: string;
}

export interface UpdateTag extends CreateTag {
  id: string;
}

export interface TagPageListParams {
  name?: string;
  pageNum: number;
  pageSize: number;
}
