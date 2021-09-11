const Connect = ({ setConnected, connected, hasFinnie }) => {
  const handleConnect = async () => {
    if (connected) {
      await window.koiWallet.disconnect()
      setConnected(false)
      return
    }

    const response = await window.koiWallet.connect()
    if (response.status === 200) setConnected(true)
  }

  return (
    <div>
      <button disabled={!hasFinnie} onClick={handleConnect}>{connected ? 'DISCONNECT' : 'CONNECT'}</button>
    </div>
  )
}

export default Connect
