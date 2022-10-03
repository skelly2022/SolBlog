import TacticMenu from "./components/TacticMenu";
import HomeMenu from "./components/HomeMenu";
import RoadMap from "./components/RoadMap";
import LeaderBoard from "./components/LeaderBoard"
import TacticSession from "./components/TacticSession";
import PlayVsPlay from "./components/PlayVsPlay";
// import { Routes, Route, Router  } from "react-router-dom";
import Navbar from "./components/sub/NavBar";
import Footer from "./components/sub/Footer";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {BrowserRouter as Router, Switch, Route, Routes} from 'react-router-dom';



const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  // let Component;

  // switch (window.location.pathname) {
  //   case "/":
  //     Component = HomeMenu;
  //     break;
  //   case "/wfeqfeqw":
  //     Component = TacticMenu;
  //     break;
  //   case "/play":
  //     Component = TacticSession;
  //     break;
  //   case "/p":
  //     Component = PlayVsPlay
  // }

  return (
    <ApolloProvider client={client}>
       
      <Navbar />
      <Routes>
      <Route path="/" element={<HomeMenu />}></Route>
      <Route path="/roadmap" element={<RoadMap />}></Route>
      <Route path="/leaderboard" element={<LeaderBoard />}></Route>
      <Route path="/play" element={<TacticSession />}></Route>
 
  </Routes>
  
    </ApolloProvider>
  );
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
