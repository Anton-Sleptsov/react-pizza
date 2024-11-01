import React from "react";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import styles from "./Search.module.scss";
import iconSearch from "../../assets/img/search-icon.svg";
import iconClear from "../../assets/img/clear-icon.svg";
import { setSearchText } from "../../redux/slices/filterSlice";

export const Search: React.FC = () => {
  const dispath = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setSearchTextInRedux = React.useCallback(
    debounce((text: string) => {
      dispath(setSearchText(text));
    }, 1000),
    []
  );

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setSearchTextInRedux(event.target.value);
  };

  const onClickClear = () => {
    setValue("");
    dispath(setSearchText(""));
    inputRef.current?.focus();
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
