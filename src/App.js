import './App.css';
import { listen } from '@tauri-apps/api/event';
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri'

const App = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const myFunc = async () => await unlistenHandler();
    myFunc();
  },[])

  const unlistenHandler = async () => {
    return await listen('rust-event', (event) => {
        const batch = JSON.parse(event.payload);
        setList(currentList => [...currentList, ...batch]);
    })
  }

  const handleClick = async () => {
    invoke('my_custom_command').catch(error => console.log("Erorrrrr:", error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>Click Me!</button>
        {list.map((item, i) => <li key={i}>{item.first} - {item.last}</li>)}
      </header>
    </div>
  );
}

export default App;
