import React from "react";
import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😔</span> 
        <br />
        Контент не найден
      </h1>
      <p className={styles.description}>К сожалению не удалось найти такую информацию на нашем сайте</p>
    </div>
  );
};
