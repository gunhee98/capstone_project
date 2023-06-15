import Header from "./Header";
import Movie from "./Movie";
import Main from "./Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Main />}></Route>
        {/* <Route path="/" element={<Movie />}>
          <Route path="/movies/:id" element={<Movie />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
