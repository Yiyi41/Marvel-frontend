import "./index.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import ComicsOfCharacter from "./pages/ComicsOfCharacter/ComicsOfCharacter";
import Footer from "./components/Footer/Footer";
// import fontawesome icon library
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/:id" element={<ComicsOfCharacter />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
