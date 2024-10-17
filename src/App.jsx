import "./scss/app.scss";
import { Header } from "./components/Header";
import { Categories } from "./components/Categories";
import { PizzaBlock } from "./components/PizzaBlock";

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <Categories />
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock title="Чизбургер-пицца" price={395} />
            <PizzaBlock title="Чизбургер-пицца" price={395} />
            <PizzaBlock title="Чизбургер-пицца" price={395} />
            <PizzaBlock title="Чизбургер-пицца" price={395} />
            <PizzaBlock title="Чизбургер-пицца" price={395} />
            <PizzaBlock title="Чизбургер-пицца" price={395} />
            <PizzaBlock title="Чизбургер-пицца" price={395} />
            <PizzaBlock title="Чизбургер-пицца" price={395} />
            <PizzaBlock title="Чизбургер-пицца" price={395} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
