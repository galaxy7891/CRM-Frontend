import ActivityLog from "@/components/profile/activity-log";
import CardCompany from "@/components/profile/card-company";
import HeaderProfile from "@/components/profile/header";
import React from "react";

const DetailUser = () => {
  return (
    <div>
      <HeaderProfile />
      <CardCompany />
      <ActivityLog />
    </div>
  );
};

export default DetailUser;
