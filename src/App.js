import { useState } from 'react';
import './App.css';
import UserPage from './pages/UserPage';
function App() {
  const [data,setData]=useState([])
  return (
    <div className="App bg-gray-900" >
        <UserPage/>
    </div>
  );
}

export default App;
