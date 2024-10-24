import React from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import iconSearch from "../../assets/img/search-icon.svg";
import iconClear from "../../assets/img/clear-icon.svg";
import { SearchContext } from "../../layouts/Layout";

export const Search = () => {
  const { setSearchText } = React.useContext(SearchContext);
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setSearchTextInContext = React.useCallback(
    debounce((text) => {
      setSearchText(text);
    }, 1000),
    []
  );

  const onChangeValue = (event) => {
    setValue(event.target.value);
    setSearchTextInContext(event.target.value);
  };

  const onClickClear = () => {
    setValue("");
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <img src={iconSearch} alt="" className={styles.iconSearch} />
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Поиск пицц..."
        value={value}
        onChange={onChangeValue}
      />
      {value && (
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
