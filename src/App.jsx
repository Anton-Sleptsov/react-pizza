import "./scss/app.scss";
import { Header } from "./components/Header";
import { Categories } from "./components/Categories";
import { PizzaBlock } from "./components/PizzaBlock";
import { Sort } from "./components/Sort";
import React from "react";

function App() {
  const [pizzas, setPizzas] = React.useState([]);

  React.useEffect(() => {
    fetch("https://6712c3d46c5f5ced662497c0.mockapi.io/items")
      .then((res) => res.json())
      .then((data) => setPizzas(data));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>

          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
