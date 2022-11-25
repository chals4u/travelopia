import { Navbar } from "components/Navbar";
import { QuestionsPage } from "components/QuestionsPage";

export const Questions = () => {
  return (
    <>
      <div class="main-container">
        <div class="user-admin">
          <Navbar />
          <QuestionsPage />
        </div>
      </div>
    </>
  );
};
