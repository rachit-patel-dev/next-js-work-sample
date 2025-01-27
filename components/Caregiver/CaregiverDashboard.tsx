// * Custom Components
import MyBreadCrumb from "@/components/Commons/Breadcrumb/Breadcrumb";
import NotificationBanner from "@/components/Commons/NoficationBanner";
import SearchInput from "@/components/Commons/SearchInput";
import SelectInput from "@/components/Commons/SelectInput";
import DashboardTable from "./Table/DashboardTable";

import { caregiverTableColumns, caregiverTableRows, periodOptions } from "@/helpers/constants";

const CaregiverDashboard = () => {
  return (
    <>
      <MyBreadCrumb />
      <NotificationBanner title="Employee COVID-19 Screening" status="Not Completed" actionMessage="Start Today's Screening" />
      <SelectInput label="Period" options={periodOptions} />
      <SearchInput />
      <DashboardTable columns={caregiverTableColumns} rows={caregiverTableRows} />
    </>
  );
};

export default CaregiverDashboard;
