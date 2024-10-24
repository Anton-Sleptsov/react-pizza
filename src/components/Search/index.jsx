import React from "react";
import styles from "./Search.module.scss";
import iconSearch from "../../assets/img/search-icon.svg";
import iconClear from "../../assets/img/clear-icon.svg";
import { SearchContext } from "../../layouts/Layout";

export const Search = () => {
  const { searchText, setSearchText } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchText("");
    inputRef.current.focus();
  }

  return (
    <div className={styles.root}>
      <img src={iconSearch} alt="" className={styles.iconSearch} />
      <input
      ref={inputRef}
        className={styles.input}
        placeholder="Поиск пицц..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      {searchText && (
        <img
          onClick={onClickClear}
          src={iconClear}
          alt=""
          className={styles.iconClear}
        />
      )}
    </div>
  );
};
