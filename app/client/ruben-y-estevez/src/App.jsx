import './App.css';
import { Route,Routes } from 'react-router-dom';
import LongIn from './components/LongIn';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path='/' element={<LongIn/>} ></Route>
      <Route exact path='/Registrarse' element = {<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
