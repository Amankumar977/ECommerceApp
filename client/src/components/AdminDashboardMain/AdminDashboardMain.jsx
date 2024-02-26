import React from "react";

const AdminDashboardMain = ({ active }) => {
  return (
    <div>
      {active == 1 && (
        <div>
          <div className="w-ful mt-1 pl-1 md:pl-6">
            <h3 className="text-2xl text-[#484bf7]">Dashboard</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardMain;
