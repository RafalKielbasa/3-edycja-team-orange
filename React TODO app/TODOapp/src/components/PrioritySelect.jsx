export default function PrioritySelect({
  items,
  setItems,
  highPriorityItems,
  setHighPriorityItems,
}) {
  const setPriority = (id, value) => {
    const index = items.findIndex((item) => item.id === id);
    const newItem = {
      ...items[index],
      priority: value,
    };
    const newItems = [...items];
    newItems.splice(index, 1, newItem);

    setItems(newItems);

    if (newItems[index].priority === 'high') {
      setHighPriorityItems([...highPriorityItems, newItems[index]]);
    } else {
      highPriorityItems.splice(index, 1);
    }
  };
  return (
    <span>
      {items?.map((item) => (
        <select onChange={(event) => setPriority(item.id, event.target.value)}>
          <option value={'low'}>Low</option>
          <option value={'medium'}>medium </option>
          <option value={'high'}>high </option>
        </select>
      ))}
    </span>
  );
}
