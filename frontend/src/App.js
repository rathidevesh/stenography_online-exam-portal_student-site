import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import AdmitCard from './components/AdmitCard';
import Navbar from './components/NavBar';
import FetchQuestions from './components/FetchQuestions';
import InstructionPage from './components/InstructionPage';
import ExamEnded from './components/ExamEnded';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route path='/admitcard' element={<AdmitCard />} />
        <Route path='/fetchquestions' element={<FetchQuestions />} />
        <Route path='/instructions' element={<InstructionPage />} />
        <Route path='/examEnded' element={<ExamEnded />} />
      </Routes>
    </Router>
  );
}

export default App;
