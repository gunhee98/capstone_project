import Header from "./Header";
import Main from "./Main.js"
import Movie from "./routes/Movie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
      <Route path="/" element={<Main />} />
        {/* <Route path="/" element={<Movie />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movies/:id" element={<Movie />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
