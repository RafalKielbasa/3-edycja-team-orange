const SelectPriority = ({ items, setItems, item }) => {
  const optionChange = (id, value) => {
    const index = items.findIndex((item) => item.id === id);
    const newItem = {
      ...items[index],
      priority: value,
    };
    const newItems = [...items];
    newItems.splice(index, 1, newItem);
    setItems(newItems);
  };

  return (
    <select
      id="selectPriority"
      key={item.id}
      onChange={(event) => optionChange(item.id, event.target.value)}
    >
      <option value={"empty"}>---</option>
      <option value={"high"}>High</option>
      <option value={"medium"}>Medium</option>
      <option value={"low"}>Low</option>
    </select>
  );
};
export default SelectPriority;
