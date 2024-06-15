import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import GetDate from './GetDate';
import PrioritySelect from './PrioritySelect';

export default function AllTasks({
  items,
  setItems,
  highPriorityItems,
  setHighPriorityItems,
}) {
  const markAsCompleted = (id) => {
    const index = items.findIndex((item) => item.id === id);
    const newItem = {
      ...items[index],
      isCompleted: !items[index].isCompleted,
    };

    const newItems = [...items];
    newItems.splice(index, 1, newItem);

    setItems(newItems);
  };

  const deleteTask = (id) => {
    const index = items.findIndex((item) => item.id === id);
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return items.map((item) => (
    <li key={item.id}>
      <div>
        <span className={item.isCompleted ? 'text-strike' : null}>
          {item.value}
        </span>
        <CheckIcon onClick={() => markAsCompleted(item.id)} />
        <DeleteIcon onClick={() => deleteTask(item.id)} />
        <GetDate></GetDate>
        <PrioritySelect
          items={items}
          setItems={setItems}
          highPriorityItems={highPriorityItems}
          setHighPriorityItems={setHighPriorityItems}
        ></PrioritySelect>
      </div>
    </li>
  ));
}
