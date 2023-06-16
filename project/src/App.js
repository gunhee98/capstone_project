
import Main from "./Main.js"
import Movie from "./routes/Movie";
import AccountDetail from "./AccountDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNav from './TopNav';

function App() {

  return (
    <BrowserRouter>
      <TopNav></TopNav>
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/Account" element={<AccountDetail />} />
      
        <Route path="/movie" element={<Movie />} />
        <Route path="movie/movies/:id" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
