import { useState, useEffect } from "react";

const Counter = ({ items }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(items.length);
  }, [items]);

  return (
    <div>
      <h3>Number of entered tasks: {counter} </h3>
    </div>
  );
};
export default Counter;
