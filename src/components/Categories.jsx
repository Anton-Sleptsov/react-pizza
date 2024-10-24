import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCategory } from "../redux/slices/filterSlice";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories = () => {
  const currentValue = useSelector((state) => state.filter.activeCategory);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={currentValue === index ? "active" : ""}
            onClick={() => dispatch(setActiveCategory(index))}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
