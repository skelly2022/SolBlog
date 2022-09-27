import TacticMenu from "./components/TacticMenu";
import TacticSession from "./components/TacticSession";
// import { Routes, Route, Router  } from "react-router-dom";
import Navbar from "./components/sub/NavBar";
import Footer from "./components/sub/Footer";


function App() {

let Component

switch(window.location.pathname) {
  case "/":
    Component = TacticMenu
    break
    case "/beginner":
      Component = TacticSession
      break
}





  return (
  <>
    <Navbar/>
    <Component/>
    <Footer/>
    </>)
  // return (
    
  //   <Routes>
  //     <>
  //       <Route path="/" element={<TacticMenu />} />
  //       <Route path="/beginner" element={<TacticSession />} />
  //     </>
  //   </Routes>

  // );
}

export default App;
