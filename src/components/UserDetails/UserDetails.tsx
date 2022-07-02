import React, { useEffect, useState } from "react";
import { API, IUsersDetailsResponse } from "../../services/API";
import { useParams } from "react-router-dom";
import { Avatar, Descriptions } from "antd";
import { getUserDetailsData } from "./helpers";
import { IUserDetailsData } from "../../interfaces";
import "./style.scss";

export const UserDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<IUsersDetailsResponse | null>(null);

  const fetchDetails = async () => {
    const data = await API.getUserDetails(id || "");
    setDetails(data);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  console.log(details);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "20px" }}>
        <Avatar size={150} src={details?.avatar_url} />
      </div>
      <Descriptions column={1}>
        {getUserDetailsData(details).map((userDetails: IUserDetailsData) => (
          <Descriptions.Item label={userDetails.label} key={userDetails.label}>
            {userDetails.value}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </div>
  );
};
