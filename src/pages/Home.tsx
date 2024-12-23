import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "../components/Categories";
import { Sort, sorts } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Sceleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import {
  selectFilters,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";
import { ErrorFetch } from "../components/ErrorFetch";

export const Home: React.FC = () => {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const navigate = useNavigate();

  const { activeCategory, activeSort, currentPage, searchText } =
    useSelector(selectFilters);
  const { items, status } = useSelector(selectPizzaData);
  const dispathc = useDispatch();

  const getPizzas = () => {
    const page = `page=${currentPage}&limit=4`;
    const sort = activeSort.property;
    const order = activeSort.order;
    const category = activeCategory === 0 ? "" : `&category=${activeCategory}`;
    const search = searchText ? `&search=${searchText}` : "";
    let methodName;
    if (category.length > 0 && search.length > 0) {
      methodName = "GetAllByCategoryAndSearchText";
    } else if (category.length > 0) {
      methodName = "GetAllByCategory";
    } else if (search.length > 0) {
      methodName = "GetAllBySearchText";
    } else {
      methodName = "GetAllSortAndOrder";
    }

    dispathc(
      //@ts-ignore
      fetchPizzas({
        page,
        category,
        sort,
        order,
        search,
        methodName
      })
    );
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: activeSort.property,
        sortOrder: activeSort.order,
        categoryId: activeCategory,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategory, activeSort, currentPage]);

  React.useEffect(() => {
    const url = window.location.search;
    if (url) {
      const params = qs.parse(url.substring(1));
      const sort = sorts.find(
        (item) =>
          item.property === params.sortProperty &&
          item.order === params.sortOrder
      );

      dispathc(
        setFilters({
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [activeCategory, activeSort, searchText, currentPage]);

  const pizzas = items.map((pizza: any) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));
  const skeletons = [...new Array(4)].map((_, index) => (
    <Sceleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {status === "error" ? (
        <ErrorFetch />
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination
        onChangePage={(number: number) => dispathc(setCurrentPage(number))}
      />
    </div>
  );
};
