import React, { useEffect, useState } from "react";
import { Avatar, Card } from "antd";
import "./style.scss";
import { API } from "../../services/API";
import { IUser } from "../../interfaces";

export const User = ({ id, avatar_url, login }: IUser) => {
  const [repositoriesCount, setRepositoriesCount] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRepositoriesCount = async () => {
      const { data } = await API.getUserDetails(id);
      if (isMounted) {
        setRepositoriesCount(data.public_repos);
      }
    };

    fetchRepositoriesCount();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Card key={id} className="card-wrapper">
      <div className="avatar-wrapper">
        <Avatar size={80} src={avatar_url} />
        <div className="username">{login}</div>
      </div>
      <div className="repository-count">Repo: {repositoriesCount}</div>
    </Card>
  );
};
