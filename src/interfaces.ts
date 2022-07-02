export interface IUser {
  id: string;
  avatar_url: string;
  login: string;
  repoCount?: number | null;
}

export interface IUserDetailsData {
  value?: string | number;
  label?: string;
}
