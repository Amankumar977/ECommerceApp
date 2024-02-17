import React, { useEffect } from "react";
import Profile from "../components/Profile/Profile.jsx";
const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Profile />
    </div>
  );
};

export default ProfilePage;
