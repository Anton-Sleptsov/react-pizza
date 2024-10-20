import React from "react";
import styles from "./Search.module.scss";
import iconSearch from "../../assets/img/search-icon.svg";
import iconClear from "../../assets/img/clear-icon.svg";
import { SearchContext } from "../../layouts/Layout";

export const Search = () => {
  const { searchText, setSearchText } = React.useContext(SearchContext);

  return (
    <div className={styles.root}>
      <img src={iconSearch} alt="" className={styles.iconSearch} />
      <input
        className={styles.input}
        placeholder="Поиск пицц..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchText && (
        <img
          onClick={() => setSearchText("")}
          src={iconClear}
          alt=""
          className={styles.iconClear}
        />
      )}
    </div>
  );
};
