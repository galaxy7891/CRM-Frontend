import ActivityLog from "@/components/profile/activity-log";
import CardProfile from "@/components/profile/card-profile";
import HeaderProfile from "@/components/profile/header";
import React from "react";

const DetailUser = () => {
  return (
    <div>
      <HeaderProfile />
      <CardProfile />
      <ActivityLog />
    </div>
  );
};

export default DetailUser;
