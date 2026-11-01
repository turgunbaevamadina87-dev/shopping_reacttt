import type { Item } from "../types";

interface Props {
  item: Item;
  onRemove: (id: number) => void;
}

// Отдельный компонент элемента списка: данные приходят через props
export default function ShoppingItem({ item, onRemove }: Props) {
  return (
    <li className="item">
      <span className="item__name">{item.name}</span>
      <span className="item__price">{item.price.toLocaleString("ru-RU")} сом</span>
      <button
        className="item__remove"
        onClick={() => onRemove(item.id)}
        aria-label={`Удалить ${item.name}`}
      >
        Удалить
      </button>
    </li>
  );
}
