import React, { useEffect, useState } from "react";
import { Avatar, Card } from "antd";
import "./style.scss";
import { API } from "../../services/API";
import { IUser } from "../../interfaces";

interface IUserDetails extends IUser {
  setLoading?: (loading: boolean) => void;
}

export const User = ({
  id,
  avatar_url,
  login,
  setLoading,
  repoCount,
}: IUserDetails) => {
  /*  useEffect(() => {
    async function asyncFunc() {
      // setLoading?.(true);

      const fetchRepositoriesCount = async () => {
        const publicRepos = await API.getUserDetails(id);

        setRepositoriesCount(publicRepos);
      };

      await fetchRepositoriesCount();
      // setLoading?.(false);
    }

    asyncFunc();
  }, []);*/

  return (
    <Card key={id} className="card-wrapper">
      <div className="avatar-wrapper">
        <Avatar size={80} src={avatar_url} />
        <div className="username">{login}</div>
      </div>
      <div className="repository-count">Repo: {repoCount}</div>
    </Card>
  );
};
