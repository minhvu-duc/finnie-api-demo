import { useEffect, useState } from 'react';
import './App.css';

import Connect from './Components/Connect'
import Upload from './Components/Upload'

function App() {
  const [connected, setConnected] = useState(false)
  const [hasFinnie, setHasFinnie] = useState(false)

  useEffect(() => {
    window.addEventListener('arweaveWalletLoaded', () => {
      setHasFinnie(true)
    })
  }, [])

  useEffect(() => {
    const loadPermissions = async () => {
      const response = await window.koiWallet.getPermissions()
      if (response.status === 200) {
        setConnected(true)
      }
    }

    if (hasFinnie) loadPermissions()
  }, [hasFinnie])

  return (
    <div className="App">
      <div className='item'>
        <Connect hasFinnie={hasFinnie} connected={connected} setConnected={setConnected} />
        <>Connected: {connected.toString()}</>
      </div>
      {connected && 
      <div className='item'>
        <Upload />
      </div>}
    </div>
  );
}

export default App;
