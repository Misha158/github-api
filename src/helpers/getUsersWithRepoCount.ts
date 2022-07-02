import { API } from "../services/API";
import { IUser } from "../interfaces";

interface IProps {
  usersData: IUser[] | null;
  setUsers: (users: IUser[]) => void;
  setLoading: (loading: boolean) => void;
}

export async function getUsersWithRepoCount({
  usersData,
  setUsers,
  setLoading,
}: IProps) {
  const userIds = usersData?.map((user: IUser) => user.id);
  let promises: Promise<number | null>[] = [];

  userIds?.forEach((userId: string) => {
    promises.push(API.getUserDetails(userId));
  });

  const promData = await Promise.all<number | null>(promises);

  const usersWithRepoCount = usersData?.map((user: IUser, index: number) => ({
    id: user.id,
    avatar_url: user.avatar_url,
    login: user.login,
    repoCount: promData[index],
  }));

  await setUsers(usersWithRepoCount || []);
  setLoading(false);
}
