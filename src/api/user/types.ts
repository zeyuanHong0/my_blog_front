export interface SignUpData {
  username: string;
  password: string;
  email: string;
}

export interface SignInData {
  username: string;
  password: string;
}

export interface ListParams {
  name?: string;
  pageNum: number;
  pageSize: number;
}

export interface UserStatus {
  id: string;
  status: 0 | 1;
}
