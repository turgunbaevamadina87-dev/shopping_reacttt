import { useState } from "react";
import type { FormEvent } from "react";
import ShoppingItem from "./components/ShoppingItem";
import type { Item } from "./types";

let nextId = 1;

export default function App() {
  // state: список товаров и поля формы
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const priceNum = Number(price);
    if (!name.trim()) {
      setError("Введите название товара");
      return;
    }
    if (price === "" || Number.isNaN(priceNum) || priceNum < 0) {
      setError("Введите корректную цену");
      return;
    }
    setItems((prev) => [...prev, { id: nextId++, name: name.trim(), price: priceNum }]);
    setName("");
    setPrice("");
    setError("");
  }

  function handleRemove(id: number) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  const total = items.reduce((sum, it) => sum + it.price, 0);

  return (
    <main className="app">
      <h1>Список покупок</h1>

      <form className="form" onSubmit={handleAdd}>
        <input
          placeholder="Название товара"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          min="0"
          step="any"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Добавить</button>
      </form>
      {error && <p className="error">{error}</p>}

      {items.length === 0 ? (
        <p className="empty">Список пуст. Добавьте первый товар.</p>
      ) : (
        <ul className="list">
          {items.map((it) => (
            <ShoppingItem key={it.id} item={it} onRemove={handleRemove} />
          ))}
        </ul>
      )}

      <p className="total">
        Общая стоимость: <strong>{total.toLocaleString("ru-RU")} сом</strong>
      </p>
    </main>
  );
}
