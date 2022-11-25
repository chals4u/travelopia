import { Navbar } from "components/Navbar";
import { DashboardPage } from "components/DashboardPage";

export const Dashboard = () => {
  return (
    <>
      <div class="main-container">
        <div class="user-admin">
          <Navbar />
          <DashboardPage />
        </div>
      </div>
    </>
  );
};
