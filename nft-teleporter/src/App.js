import logo from './logo.svg';
import './App.css';
import HederaContract from './components/HederaContract'; 
import NFTContract from './components/NFTContract';

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
      </header>
    </div>
  );
}

export default App;
