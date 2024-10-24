import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "../components/Categories";
import { Sort, sorts } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Sceleton } from "../components/PizzaBlock/Skeleton";
import { SearchContext } from "../layouts/Layout";
import { Pagination } from "../components/Pagination";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice";

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const navigate = useNavigate();

  const { activeCategory, activeSort, currentPage } = useSelector(
    (state) => state.filter
  );
  const dispathc = useDispatch();
  const { searchText } = React.useContext(SearchContext);

  const fetchPizzas = () => {
    setIsLoading(true);

    const page = `page=${currentPage}&limit=4`;
    const category = activeCategory === 0 ? "" : `&category=${activeCategory}`;
    const sort = activeSort.property;
    const order = activeSort.order;
    const search = searchText ? `&search=${searchText}` : "";

    axios
      .get(
        `https://6712c3d46c5f5ced662497c0.mockapi.io/items?${page}&sortBy=${sort}&order=${order}${category}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.status === 404) {
          setItems([]);
          setIsLoading(false);
        }
      });
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
      fetchPizzas();
    }

    isSearch.current = false;
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
      <Pagination onChangePage={(number) => dispathc(setCurrentPage(number))} />
    </div>
  );
};
