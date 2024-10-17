import React from "react";

export const Categories = () => {
  const [activeCategory, setActiveCategory] = React.useState(0);
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
            className={activeCategory === index ? "active" : ""}
            onClick={() => setActiveCategory(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
