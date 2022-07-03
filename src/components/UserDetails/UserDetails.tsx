import React, { ChangeEvent, useEffect, useState } from "react";
import {
  API,
  IReposResponseNew,
  IUsersDetailsResponse,
} from "../../services/API";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Input, Spin } from "antd";
import "./style.scss";
import { UserProfile } from "./UserProfile/UserProfile";
import { Repository } from "./Repository/Repository";
import queryString from "query-string";

export const UserDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<IUsersDetailsResponse | null>(null);
  const [repositories, setRepositories] = useState<
    IReposResponseNew[] | null | undefined
  >(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryUrl = queryString.parse(location.search).repositories;

  const fetchDetails = async () => {
    setLoading(true);
    const userDetails = await API.getUserDetails(id || "");

    await setDetails(userDetails);
    await fetchRepos(userDetails?.login, queryUrl);
  };

  const fetchRepos = async (
    login?: string,
    queryUrl?: string | null | (string | null)[]
  ) => {
    const userRepositories = await API.getRepositoriesByUserName(login || "");

    if (queryUrl) {
      const filteredRepos = userRepositories?.filter(
        (repo: IReposResponseNew) => repo.name.includes(queryUrl as string)
      );

      setRepositories(filteredRepos);
      setLoading(false);

      return;
    }

    await setRepositories(userRepositories);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const onSearchRepositories = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setLoading(true);
      await navigate(`/user/${id}`);
      await fetchRepos(details?.login, event.target.value);
      setLoading(false);
      return;
    }

    navigate(`/user/${id}?repositories=${event.target.value}`);

    const userRepositories = await API.getRepositoriesByUserName(
      details?.login || ""
    );

    const filteredRepos = userRepositories?.filter((repo: IReposResponseNew) =>
      repo.name.includes(event.target.value)
    );

    setRepositories(filteredRepos);
  };

  if (!details) {
    return <Spin size="large" />;
  }

  return (
    <>
      <UserProfile details={details} />
      <Input
        placeholder="Search for User's repositories"
        onChange={onSearchRepositories}
        className="input-user-repositories"
        value={queryUrl as string}
        autoFocus={true}
      />
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          {!repositories?.length && <div>No repositories yet</div>}
          {repositories?.map((repository: IReposResponseNew) => (
            <Repository repository={repository} key={repository.name} />
          ))}
        </>
      )}
    </>
  );
};
