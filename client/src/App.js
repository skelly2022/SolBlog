import HomeMenu from "./components/pages/HomeMenu";
import PlayVsPlay from "./components/pages/PlayVsPlay";
import LeaderBoard from "./components/pages/LeaderBoard"
import TacticSession from "./components/pages/TacticSession";
// import PlayVsPlay from "./components/PlayVsPlay";
// import { Routes, Route, Router  } from "react-router-dom";
import Navbar from "./components/sub/NavBar";
// import Footer from "./components/sub/Footer";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Board from "./components/pages/Board";


const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
       
      <Navbar />
      <Routes>
      <Route path="/" element={<HomeMenu/>}></Route>
      <Route path="leaderboard" element={<LeaderBoard />}></Route>
      <Route path="play" element={<TacticSession />}></Route>
      <Route path="playvs" element={<PlayVsPlay/>}></Route>
 
  </Routes>
  
    </ApolloProvider>
  );
}

export default App;
