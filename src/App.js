import TacticMenu from "./components/TacticMenu";
import TacticSession from "./components/TacticSession";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <>
        <Route path="/" element={<TacticMenu />} />
        <Route path="/beginner" element={<TacticSession time={180000} />} />
      </>
    </Routes>
  );
}

export default App;
