import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import ComicsOfCharacter from "./pages/ComicsOfCharacter/ComicsOfCharacter";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/:id" element={<ComicsOfCharacter />} />
      </Routes>
    </Router>
  );
}

export default App;
