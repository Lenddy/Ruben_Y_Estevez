import './App.css';
import { Route,Routes } from 'react-router-dom';
import LongIn from './components/LongIn';
import Register from './components/Register';
import DashBoard from "./components/DashBoard"
import ClientForm from './components/ClientForm';
import OneClient from './components/OneClient';
import ClientUpdate from './components/ClientUpdate';
import AllLoans from './components/loans/AllLoans';
import AddLoan from './components/loans/AddLoan';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path='/' element={<LongIn/>} ></Route>
      <Route exact path='/Registrarse' element = {<Register/>} />
      <Route exact path='/DashBoard' element={<DashBoard/>} />
      <Route exact path='/nuevo/cliente' element={<ClientForm/>} />
      <Route exact path='/:id' element={<OneClient/>} />
      <Route exact path='/editar/cliente/:id' element={<ClientUpdate/>} />
      <Route exact path='/Prestamos' element={<AllLoans/>} />
      <Route exact path='/Nuevo/Prestamos' element={<AddLoan/>} />

      </Routes>
    </div>
  );
}

export default App;
