import logo from './logo.svg';
import './App.css';
import HederaContract from './components/HederaContract'; 
import NFTContract from './components/NFTContract';
import MoralisAuth from './components/MoralisAuth';
// import { MoralisProvider } from "react-moralis";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          SOMETHING HERE
        </p>
        <NFTContract/>
        {/* <MoralisProvider serverUrl="https://gfxjx7xvagdu.usemoralis.com:2053/server" appId="bb0lJNfM2uBk6sjgJm3QzybpZh6SBLH6MNcuLERk">
          <MoralisAuth/>
        </MoralisProvider> */}
      </header>
    </div>
  );
}

export default App;
