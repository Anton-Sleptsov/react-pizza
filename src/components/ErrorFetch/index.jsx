import styles from "./ErrorFetch.module.scss";

export const ErrorFetch = () => {
  return (
    <div className={styles.root}>
      <h2>
        Пиццы не найдены 😔
      </h2>
      <p className={styles.description}>К сожалению не удалось загрузить пиццы. Попробуйте зайти позже.</p>
    </div>
  );
};
