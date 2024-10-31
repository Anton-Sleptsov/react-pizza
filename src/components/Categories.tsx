import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveCategory, setActiveCategory } from "../redux/slices/filterSlice";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC = () => {
  const currentValue = useSelector(selectActiveCategory);
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
