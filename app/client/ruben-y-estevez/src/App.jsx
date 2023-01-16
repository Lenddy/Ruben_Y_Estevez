import './App.css';
import { Route,Routes } from 'react-router-dom';
import LongIn from './components/LongIn';
import Register from './components/Register';
import DashBoard from "./components/DashBoard"

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path='/' element={<LongIn/>} ></Route>
      <Route exact path='/Registrarse' element = {<Register/>} />
      <Route exact path='/DashBoard' element={<DashBoard/>} />
      </Routes>
    </div>
  );
}

export default App;
