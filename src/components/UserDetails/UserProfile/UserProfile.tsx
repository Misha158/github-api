import React from "react";
import { Avatar, Descriptions } from "antd";
import { getUserDetailsData } from "../helpers";
import { IUserDetailsData } from "../../../interfaces";
import { IUsersDetailsResponse } from "../../../services/API";

interface IProps {
  details: IUsersDetailsResponse;
}

export const UserProfile = ({ details }: IProps) => {
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
    </>
  );
};
