import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input, Spin } from "antd";
import "./style.scss";
import { User } from "./components";
import { API } from "./services/API";
import { IUser } from "./interfaces";
import { getUsersWithRepoCount } from "./helpers/getUsersWithRepoCount";

function App() {
  const [userSearch, setUserSearch] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const didMount = useRef(false);

  async function getUsers() {
    const usersData = await API.getUsers();
    getUsersWithRepoCount({ usersData, setUsers, setLoading });
  }

  async function getUsersBySearch() {
    const usersData = await API.getUsersBySearch(userSearch);

    getUsersWithRepoCount({ usersData, setUsers, setLoading });
  }

  useEffect(() => {
    setLoading(true);

    async function asyncFunc() {
      if (!didMount.current) {
        didMount.current = true;
        await getUsers();

        return;
      }

      await getUsersBySearch();
    }

    asyncFunc();
  }, [userSearch]);

  const onSearchUsers = (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setUserSearch(event.target.value);
  };

  return (
    <div className="container">
      <h1>Github searcher</h1>
      <Input value={userSearch} onChange={onSearchUsers} />
      {loading ? (
        <Spin size="large" />
      ) : (
        users.map((user: IUser) => (
          <User
            key={user.id}
            id={user.id}
            avatar_url={user.avatar_url}
            login={user.login}
            repoCount={user.repoCount}
          />
        ))
      )}
    </div>
  );
}

export default App;
