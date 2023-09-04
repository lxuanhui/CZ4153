import { Routes, Route, Link } from "react-router-dom";
import FairLaunch from "./components/FairLaunch";
import NFTFunctions from "./components/NFTFunctions";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="exchangeNFT" element={<NFTPage />}/>
      </Routes>
    </div>
  );
}

function Home(){
  return(
    <>
      <Link to="/exchangeNFT"> Mint NFT Here </Link>
      <FairLaunch/>
    </>
  )
}
function NFTPage(){
  return(
    <>
      <nav>
        <Link to="/">Deposit to FairLaunch Contract</Link>
      </nav>
      <main>
        <p> NFT Minting page! Trade your NFT Reward Token to Tier1/2/3 NFT below </p>
        <h2> 1000 NFT Token for tier1 / 3000 NFT Token for tier2 / 10000 NFT Token for tier3 </h2>
      </main>
      <NFTFunctions />
    </>
  )
}
export default App;
