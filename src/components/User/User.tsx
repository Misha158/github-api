import React from "react";
import { Avatar, Card } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";
import { IUser } from "../../interfaces";

export const User = ({ id, avatar_url, login, repoCount }: IUser) => {
  return (
    <Card key={id} className="card-wrapper">
      <Link to={`/user/${id}`} className="user-link">
        <div className="avatar-wrapper">
          <Avatar size={80} src={avatar_url} />
          <div className="username">{login}</div>
        </div>
        <div className="repository-count">Repo: {repoCount}</div>
      </Link>
    </Card>
  );
};
