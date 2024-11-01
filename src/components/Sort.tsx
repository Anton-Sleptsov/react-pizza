import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveSort, setActiveSort } from "../redux/slices/filterSlice";

type SortItem = {
  name: string;
  fullName: string;
  property: string;
  order: string;
};

export const sorts: SortItem[] = [
  {
    name: "популярности",
    fullName: "популярности (сначала популярные)",
    property: "rating",
    order: "desc",
  },
  {
    name: "популярности",
    fullName: "популярности (сначала непопулярные)",
    property: "rating",
    order: "asc",
  },
  {
    name: "цене",
    fullName: "цене (сначала дорогие)",
    property: "price",
    order: "desc",
  },
  {
    name: "цене",
    fullName: "цене (сначала дешёвые)",
    property: "price",
    order: "asc",
  },
  {
    name: "алфавиту",
    fullName: "алфавиту (в алфавитном порядке)",
    property: "title",
    order: "asc",
  },
  {
    name: "алфавиту",
    fullName: "алфавиту (в обратном порядке)",
    property: "title",
    order: "desc",
  },
];

export const Sort: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const currentValue = useSelector(selectActiveSort);
  const sortRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const choiceOfSort = (sort: SortItem) => {
    dispatch(setActiveSort(sort));
    setOpen(false);
  };

  React.useEffect(() => {
    const clickHendler = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", clickHendler);

    return () => {
      document.body.removeEventListener("click", clickHendler);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{currentValue.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sorts.map((sort, index) => (
              <li
                key={index}
                onClick={() => choiceOfSort(sort)}
                className={currentValue === sort ? "active" : ""}
              >
                {sort.fullName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
