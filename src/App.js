
import './App.css';
import Table from './components/Table';
import Form from './components/Form';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <main>
        <Routes>
          <Route path='/' element={<Form />}></Route>
          <Route path='/user-table' element={<Table />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
