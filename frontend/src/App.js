import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={ <Login /> }/>
      <Route path='/register' element={ <Register /> }/>
      <Route path='/home' element={ <Home />} />
     </Routes>
    </div>
  );
}

export default App;
