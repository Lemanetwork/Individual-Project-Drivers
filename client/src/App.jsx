import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/landing/Landing.component';
import Home from './components/home/Home.component';
import Detail from './components/detail/Detail.component';
import Create from './components/create/Create.component';

export default function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
  )
};