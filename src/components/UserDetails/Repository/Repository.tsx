import React from "react";
import { Card } from "antd";
import { IReposResponseNew } from "../../../services/API";
import "./style.scss";

interface IProps {
  repository: IReposResponseNew;
}

export const Repository = ({ repository }: IProps) => {
  return (
    <a
      href={repository.repo_url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-to-repo"
    >
      <Card>
        <div>{repository.name}</div>
        <div className="repository-wrapper">
          <div>{repository.forks} Forks</div>
          <div>{repository.stars} Stars</div>
        </div>
      </Card>
    </a>
  );
};
