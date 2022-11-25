import React from "react";

import { Navbar } from "components/Navbar";
import { Search } from "components/search";

export const SearchPage = () => {
  return (
    <>
      <div className="main-container">
        <div className="user-admin">
          <Navbar />
          <Search />
        </div>
      </div>
    </>
  );
};
