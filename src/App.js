import React from "react";
import AdminPage from "./components/UI/Admin/AdminPage/AdminPage";
import LoginPage from "./components/UI/Login/LoginPage/LoginPage";
import UserPage from "./components/UI/User/UserPage/UserPage";
import { useSelector } from "react-redux";

const App = () => {
  const [isLoggedIn, isAdmin, isUser] = useSelector((state) => [
    state.auth.isLoggedIn,
    state.auth.isAdmin,
    state.auth.isUser,
  ]);

  return (
    <React.Fragment>
      {!isLoggedIn && !isAdmin && !isUser && <LoginPage></LoginPage>}
      {isLoggedIn && isUser && <UserPage></UserPage>}
      {isLoggedIn && isAdmin && <AdminPage></AdminPage>}
    </React.Fragment>
  );
};

export default App;
