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

  console.log(items);

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
