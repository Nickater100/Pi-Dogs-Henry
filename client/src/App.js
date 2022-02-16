import './App.css';
import Home from './components/Home';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Buscar from './components/Buscar';
import DogDetail from './components/DogDetail';
import AgregarPerro from './components/AgregarDog';

function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path='/buscar' element={<Buscar/>}/>
        <Route exact path='/home/:id' element={<DogDetail/>}/>
        <Route exact path='/dog-add' element={<AgregarPerro/>}/>
        </Routes>  
    </div>
    </Router>
  );
}

export default App;
