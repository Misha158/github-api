import { IUsersDetailsResponse } from "../../services/API";
import moment from "moment";

export const getUserDetailsData = (details: IUsersDetailsResponse | null) => [
  {
    label: "UserName",
    value: details?.login,
  },
  {
    label: "Email",
    value: details?.email,
  },
  {
    label: "Location",
    value: details?.location,
  },
  {
    label: "Join date",
    value: moment(details?.created_at).format("LL"),
  },
  {
    label: "Followers",
    value: details?.followers.toLocaleString(),
  },
  {
    label: "Following",
    value: details?.following.toLocaleString(),
  },
];
