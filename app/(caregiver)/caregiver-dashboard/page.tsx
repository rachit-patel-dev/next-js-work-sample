import React from "react";

// * Custom Components
import CaregiverDashboard from "@/components/Caregiver/CaregiverDashboard";

const page = () => {
  return (
    <div className="flex flex-col flex-1 ml-2">
      <CaregiverDashboard />
    </div>
  );
};

export default page;
