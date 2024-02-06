import React, { useState } from "react";
import Header from "../Layouts/Header";
import styles from "../../styles/styles";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
const Profile = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div
        className={`${styles.section} flex bg-[#f5f5f5] py-10 mt-14 800px:mt-0`}>
        <div className=" w-[50px] 800px:w-[335px]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};

export default Profile;
