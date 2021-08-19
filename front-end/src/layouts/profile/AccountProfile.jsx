import React, { useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader/PageHeader";
import UserProfileBody from "../../components/PageBody/ProfileBody/UserProfileBody";

import { Redirect } from "react-router-dom";

const AccountProfile = () => {
  return (
    <div>
      {localStorage.getItem("role") === "0" ||
      localStorage.getItem("role") === "1" ? (
        <div>
          <PageHeader></PageHeader>
          <UserProfileBody></UserProfileBody>
        </div>
      ) : (
        <Redirect to="/"></Redirect>
      )}
    </div>
  );
};

export default AccountProfile;
