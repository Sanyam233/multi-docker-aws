import { BrowserRouter, Route, Routes } from "react-router-dom";
import FibPage from "./Pages/FibPage";
import OtherPage from "./Pages/OtherPage";
import Header from "./Header";

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/other-page" element={<OtherPage />} />
            <Route path="/" element={<FibPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
