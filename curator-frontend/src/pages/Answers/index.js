import { Navbar } from "components/Navbar";
import { Answer } from "components/Answer";

export const Answers = () => {
  return (
    <>
      <div class="main-container">
        <div class="user-admin">
          <Navbar />
          <Answer />
        </div>
      </div>
    </>
  );
};
