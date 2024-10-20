import React from "react";

export const Categories = ({currentValue, setCurrentValue}) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
          key={index}
            className={currentValue === index ? "active" : ""}
            onClick={() => setCurrentValue(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
