import { useState } from 'react';
import { v4 } from 'uuid';
import List from './components/List';
import HighPriorityList from './components/HighPriorityList';
import TaskCounter from './components/TaskCounter';
import AllTasks from './components/AllTasks';

function App() {
  const [value, setValue] = useState('');
  const [highPriorityItems, setHighPriorityItems] = useState([]);
  const [items, setItems] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleAddTaskBtn = () => {
    const newItems = [
      ...items,
      {
        id: v4(),
        value,
        isCompleted: false,
      },
    ];
    setItems(newItems);
    setValue('');
  };

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
    <div>
      <h1>TODO app</h1>
      <input onChange={handleChange} value={value}></input>
      <button onClick={handleAddTaskBtn}>Add task</button>
      <div>
        <List>
          <AllTasks items={items} setItems={setItems}></AllTasks>
        </List>

        <TaskCounter items={items}></TaskCounter>
        <HighPriorityList
          highPriorityItems={highPriorityItems}
          setHighPriorityItems={setHighPriorityItems}
        ></HighPriorityList>
      </div>
    </div>
  );
}

export default App;
