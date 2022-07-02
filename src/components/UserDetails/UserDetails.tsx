import React, { ChangeEvent, useEffect, useState } from "react";
import { API, IUsersDetailsResponse } from "../../services/API";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Avatar, Card, Descriptions, Input } from "antd";
import { getUserDetailsData } from "./helpers";
import { IUserDetailsData } from "../../interfaces";
import "./style.scss";

export const UserDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<IUsersDetailsResponse | null>(null);
  const [repositories, setRepositories] = useState<any | null>(null);
  const navigate = useNavigate();

  const fetchDetails = async () => {
    const userDetails = await API.getUserDetails(id || "");

    const userRepositories = await API.getRepositoriesByUserName(
      userDetails?.login || ""
    );

    await setDetails(userDetails);
    setRepositories(userRepositories);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  console.log(repositories);

  const onSearchRepositories = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      navigate(`/user/${id}`);
      return;
    }

    navigate(`/user/${id}?q=${event.target.value}`);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "20px" }}>
          <Avatar size={150} src={details?.avatar_url} />
        </div>
        <Descriptions column={1}>
          {getUserDetailsData(details).map((userDetails: IUserDetailsData) => (
            <Descriptions.Item
              label={userDetails.label}
              key={userDetails.label}
            >
              {userDetails.value}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </div>
      <div style={{ textAlign: "start", width: "100%", marginBottom: "20px" }}>
        {details?.bio}
      </div>
      <Input
        placeholder="Search for User's repositories"
        onChange={onSearchRepositories}
        style={{ marginBottom: "10px" }}
      />
      {repositories?.map((repository: any) => (
        <Card key={repository.name}>
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              width: "100%",
              color: "black",
              alignItems: "center",
            }}
          >
            <div>{repository.name}</div>
            <div style={{ marginLeft: "auto" }}>
              <div>{repository.forks} Forks</div>
              <div>{repository.stargazers_count} Stars</div>
            </div>
          </a>
        </Card>
      ))}
    </>
  );
};
