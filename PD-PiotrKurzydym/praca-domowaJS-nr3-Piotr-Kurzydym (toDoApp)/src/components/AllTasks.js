import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SelectPriority from "./SelectPriority.js";

const AllTasks = ({ items, setItems }) => {
  const current = new Date();
  const dateAndTimeofEdit = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}/${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

  const markAsCompleted = (id) => {
    const index = items.findIndex((item) => item.id === id);
    const newItem = {
      ...items[index],
      dateAndTimeofEdit,
      isCompleted: !items[index].isCompleted,
    };
    const newItems = [...items];
    newItems.splice(index, 1, newItem);
    setItems(newItems);
  };

  const removeItem = (id) => {
    const index = items.findIndex((item) => item.id === id);
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return items.map((item) => (
    <li key={item.id}>
      <div>
        <span className={item.isCompleted ? "text-strike" : null}>
          {item.value} - {item.dateAndTime} - {item.dateAndTimeofEdit}
        </span>
        <CheckIcon id="checkIcon" onClick={() => markAsCompleted(item.id)} />
        <DeleteForeverIcon onClick={() => removeItem(item.id)} />
        <SelectPriority
          item={item}
          items={items}
          setItems={setItems}
        ></SelectPriority>
      </div>
    </li>
  ));
};
export default AllTasks;
