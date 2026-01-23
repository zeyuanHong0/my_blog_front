export interface CreateTag {
  name: string;
  icon?: string;
  dark_icon?: string;
}

export interface UpdateTag extends CreateTag {
  id: string;
}

export interface TagPageListParams {
  name?: string;
  pageNum: number;
  pageSize: number;
}
