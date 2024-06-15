import { useState, useEffect } from 'react';
import Buttons from './components/Buttons';
import Table from './components/Table';

function App() {
  const [data, setData] = useState([]);
  const [fetchData, setFetchData] = useState([]);
  const BASE_URL = 'https://swapi.dev/api/';

  useEffect(() => {
    const fetchingData = async () => {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setData(data);
    };

    fetchingData();
  }, []);

  const handleClick = (item) => {
    const buttonDataFetch = async () => {
      const res = await fetch(`${BASE_URL}${item}`);
      const data = await res.json();
      setFetchData(data.results);
    };
    buttonDataFetch();
  };

  return (
    <div>
      <Buttons data={data} url={BASE_URL} handleClick={handleClick}></Buttons>
      <Table data={fetchData}></Table>
    </div>
  );
}

export default App;
