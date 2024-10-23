import React from "react";
import { useSelector } from "react-redux";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Sceleton } from "../components/PizzaBlock/Skeleton";
import { SearchContext } from "../layouts/Layout";
import { Pagination } from "../components/Pagination";

export const Home = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { activeCategory, activeSort } = useSelector((state) => state.filter);
  const { searchText } = React.useContext(SearchContext);

  React.useEffect(() => {
    setIsLoading(true);

    const page = `page=${currentPage}&limit=4`;
    const category = activeCategory === 0 ? "" : `&category=${activeCategory}`;
    const sort = activeSort.property;
    const order = activeSort.order;
    const search = searchText ? `&search=${searchText}` : "";

    fetch(
      `https://6712c3d46c5f5ced662497c0.mockapi.io/items?${page}&sortBy=${sort}&order=${order}${category}${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, activeSort, searchText, currentPage]);

  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Sceleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
