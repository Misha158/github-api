import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Spin } from "antd";
import queryString from "query-string";

import "./style.scss";
import { User } from "./components";
import { API } from "./services/API";
import { IUser } from "./interfaces";
import { getUsersWithRepoCount } from "./helpers/getUsersWithRepoCount";

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const queryUrl = queryString.parse(location.search).q;

  const didMount = useRef(false);

  async function getUsers() {
    const usersData = await API.getUsers();

    getUsersWithRepoCount({ usersData, setUsers, setLoading });
  }

  async function getUsersBySearch(queryUrl: (string | null)[] | string) {
    const usersData = await API.getUsersBySearch(queryUrl);

    getUsersWithRepoCount({ usersData, setUsers, setLoading });
  }

  useEffect(() => {
    async function fetchUsers() {
      setLoading((prev) => prev + 1);

      if (!didMount.current) {
        queryUrl ? await getUsersBySearch(queryUrl) : await getUsers();

        didMount.current = true;
        return;
      }

      if (!queryUrl) {
        setUsers([]);
        setLoading((prev) => prev - 1);
        navigate("/");
        return;
      }

      getUsersBySearch(queryUrl);
    }

    fetchUsers();
  }, [queryUrl]);

  const onSearchUsers = (event: ChangeEvent<HTMLInputElement>) => {
    navigate(`?q=${event.target.value}`);
  };

  return (
    <>
      <Input
        value={(queryUrl as string) || ""}
        onChange={onSearchUsers}
        autoFocus={true}
      />
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
    </>
  );
}

export default App;
