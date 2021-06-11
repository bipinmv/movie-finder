import { BrowserRouter } from 'react-router-dom';
import './App.css'
import MovieNavbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter basename="/movie-finder">
      <MovieNavbar />
    </BrowserRouter>
  );
}

export default App;
