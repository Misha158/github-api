import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "antd";
import "./style.scss";
import { User } from "./components";
import { API } from "./services/API";
import { IUser } from "./interfaces";

function App() {
  const [userSearch, setUserSearch] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);

  const didMount = useRef(false);

  async function getUsers() {
    const usersData = await API.getUsers(userSearch);

    setUsers(usersData || []);
  }

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    getUsers();
  }, [userSearch]);

  const onSearchUsers = (event: ChangeEvent<HTMLInputElement>) => {
    setUserSearch(event.target.value);
  };

  return (
    <div className="container">
      <h1>Github searcher</h1>
      <Input value={userSearch} onChange={onSearchUsers} />

      {users.map((user: IUser) => (
        <User
          key={user.id}
          id={user.id}
          avatar_url={user.avatar_url}
          login={user.login}
        />
      ))}
    </div>
  );
}

export default App;
