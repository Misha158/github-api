import React from "react";
import { Avatar, Card } from "antd";
import "./style.scss";
import { IUser } from "../../interfaces";
import { useNavigate } from "react-router-dom";

export const User = ({ id, avatar_url, login, repoCount }: IUser) => {
  const navigate = useNavigate();

  const redirectToUserDetails = () => {
    navigate(`/user/${id}`);
  };

  return (
    <Card key={id} className="card-wrapper" onClick={redirectToUserDetails}>
      <div className="avatar-wrapper">
        <Avatar size={80} src={avatar_url} />
        <div className="username">{login}</div>
      </div>
      <div className="repository-count">Repo: {repoCount}</div>
    </Card>
  );
};
