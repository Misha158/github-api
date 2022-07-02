import { API, IUsersDetailsResponse } from "../services/API";
import { IUser } from "../interfaces";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  usersData: IUser[] | null;
  setUsers: (users: IUser[]) => void;
  setLoading: Dispatch<SetStateAction<number>>;
}

export async function getUsersWithRepoCount({
  usersData,
  setUsers,
  setLoading,
}: IProps) {
  const userIds = usersData?.map((user: IUser) => user.id);
  let promises: Promise<IUsersDetailsResponse | null>[] = [];

  userIds?.forEach((userId: string) => {
    promises.push(API.getUserDetails(userId));
  });

  const promData = await Promise.all<IUsersDetailsResponse | null>(promises);

  const usersWithRepoCount = usersData?.map((user: IUser, index: number) => ({
    id: user.id,
    avatar_url: user.avatar_url,
    login: user.login,
    repoCount: promData[index]?.public_repos,
  }));
  await setUsers(usersWithRepoCount || []);
  await setLoading((prev) => prev - 1);
}
