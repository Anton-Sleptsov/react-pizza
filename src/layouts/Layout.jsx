import "../scss/app.scss";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";
import React from "react";

export const SearchContext = React.createContext();

export const Layout = () => {
  const [searchText, setSearchText] = React.useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchText, setSearchText}}>
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </SearchContext.Provider>
    </div>
  );
};
