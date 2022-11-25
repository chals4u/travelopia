import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "assets/css/bootstrap.css";
import "assets/css/styleguide.css";
import "assets/css/main.css";
import "assets/css/responsive.css";

import "assets/js/bootstrap.bundle";
import { useEffect } from "react";
import { Dashboard } from "pages/Dashboard";
import { Answers } from "pages/Answers";
import { Questions } from "pages/Questions";
import { Decks } from "pages/Decks";
import { QuestionNaire } from "pages/QuestionNaire";
import { Login } from "pages/login";
import { SignupPage } from "pages/sign-up";
import { ForgotPasswordPage } from "pages/forgot-password";
import { EmailVerification } from "pages/email-verification";
import { ResetPasswordPage } from "pages/reset-password";
import { VerificationPage } from "pages/verification";
//import { PatientDialog } from "components/Patient";
import { ToastContainer } from "react-toastify";
import { PrivateRoute } from "Route/PrivateRoute";
import { AuthRoute } from "Route/AuthRoute";
import { useDispatch } from "react-redux";
import { actions } from "redux/User/action";
import { Spinner } from "components/Loader";
const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("TOKEN");

  useEffect(() => {
    if (!token) return;
    dispatch(actions.userDetail());
  }, [token, dispatch]);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/spinner" element={<Spinner />} />

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="admin/answers" element={<Answers />} />
            <Route path="/questions/:id" element={<Questions />} />
            <Route path="/decks" element={<Decks />} />
            <Route path="/questionnaire" element={<QuestionNaire />} />
          </Route>
          <Route path="/auth" element={<AuthRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="emailverify" element={<VerificationPage />} />
            <Route path="register" element={<SignupPage />} />
            <Route path="forgot" element={<ForgotPasswordPage />} />
            <Route path="verification" element={<EmailVerification />} />
            <Route path="reset" element={<ResetPasswordPage />} />
            <Route path="verified" element={<EmailVerification />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={token ? "/" : "/auth/login"} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
