import TacticMenu from "./components/TacticMenu";
import TacticSession from "./components/TacticSession";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <>
        <Route path="/" element={<TacticMenu />} />
        <Route path="/beginner" element={<TacticSession />} />
      </>
    </Routes>
  );
}

export default App;
