import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import Chart from './Chart';
import Show from './Show';

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/add' element={<Add/>}/>
    <Route path='/update' element={<Update/>}/>
    <Route path='/delete' element={<Delete/>}/>
    <Route path='/chart' element={<Chart/>}/>
    <Route path='/show' element={<Show/>}/>
    <Route path='*' element={<Home/>}/>
   </Routes>
   </BrowserRouter>
   
   </>
  );
}

export default App;
