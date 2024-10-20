import React from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Sceleton } from "../components/PizzaBlock/Skeleton";

export const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [activeSort, setActiveSort] = React.useState({
    name: "популярности",
    fullName: "популярности (сначала популярные)",
    property: "rating",
    order: "ASC",
  });

  React.useEffect(() => {
    setIsLoading(true);

    const category = activeCategory === 0 ? "" : `&category=${activeCategory}`;
    const sort = activeSort.property;
    const order = activeSort.order;

    fetch(`https://6712c3d46c5f5ced662497c0.mockapi.io/items?sortBy=${sort}&order=${order}${category}`)
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, activeSort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          currentValue={activeCategory}
          setCurrentValue={(i) => setActiveCategory(i)}
        />
        <Sort
          currentValue={activeSort}
          setCurrentValue={(sort) => setActiveSort(sort)}
        />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Sceleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};
