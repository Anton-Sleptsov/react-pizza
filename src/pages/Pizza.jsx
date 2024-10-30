import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const Pizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://6712c3d46c5f5ced662497c0.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
        alert("Пицца не найдена!");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <div className="container">Идёт загрузка...</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="image" />
      <h1>{pizza.title}</h1>
      <p>Цена: {pizza.price}</p>
    </div>
  );
};
