import "../scss/app.scss";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
