import React, { FunctionComponent } from "react";
import { Computer, Email, Phone, Pin } from "@mui/icons-material";

import "./Card.css";
import { User } from "../interfaces/interfaces";

const UserCard: FunctionComponent<User> = ({
  name,
  phone,
  email,
  website,
  address,
}) => {
  return (
    <div className="cardContainer">
      <div className="userName">
        <div>{name}</div>
      </div>

      <div className="infoContainer">
        <div>
          <Phone />
          {phone}
        </div>
        <div>
          <Email />
          {email}
        </div>
        <div>
          <Computer />
          {website}
        </div>
        <div>
          <Pin />
          {address.suite}, {address.street}, {address.zipcode}, {address.city}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
