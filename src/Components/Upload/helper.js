import Arweave from 'arweave'

const arweave = Arweave.init({ host: 'arweave.net', protocol: 'https', port: 443, })

export const exportNFT = async (payload) => {
  try {
    const file = payload.file
    const fileType = file.type
  
    /* 
      Get data buffer from file
      That will be required when create a data transaction
    */ 
    const url = URL.createObjectURL(file)
    const response = await fetch(url)
    const blob = await response.blob()
    const dataBuffer = await blob.arrayBuffer()
  
  
    /* 
      get owner address using koiWallet API
    */ 
    const { data: ownerAddress } = await window.koiWallet.getAddress()
  

    /* 
      not sure what it will do
      let's ask Syed about this
    */
    const balances = {}
    balances[ownerAddress] = 1

    const d = new Date()
    const createdAt = Math.floor(d.getTime()/1000).toString()
    
    const initialState = {
      'owner': ownerAddress,
      'title': payload.title,
      'name': payload.username,
      'description': payload.description,
      'ticker': 'KOINFT',
      'balances': balances,
      'contentType': fileType,
      'createdAt': createdAt,
      'tags': []
    }
  
    const tx = await arweave.createTransaction({ data: dataBuffer })
  
    /* 
      now we add tags for the transaction
      only upload nft to Koii will require this set of tags
      others will have different tags
    */
    tx.addTag('Content-Type', fileType)
    tx.addTag('Network', 'Koi')
    tx.addTag('Action', 'marketplace/Create')
    tx.addTag('App-Name', 'SmartWeaveContract')
    tx.addTag('App-Version', '0.3.0')
    tx.addTag('Contract-Src', 'I8xgq3361qpR8_DvqcGpkCYAUTMktyAgvkm6kGhJzEQ')
    tx.addTag('Init-State', JSON.stringify(initialState))
    tx.addTag('NSFW', payload.isNSFW)
  
    /* 
      Now we sign the transaction using Finnie.
      Just run the function sign() and your transaction will be signed automatically
    */
    await window.koiWallet.sign(tx)
  
    /* 
      With a signed transaction, now we can post it to the chain
    */ 
    const uploader = await arweave.transactions.getUploader(tx) // get uploader
    await uploader.uploadChunk() // upload
    // If we stop here, the transaction will be minted on chain, without reigstering to Koii
  
    /* 
      The last step is to register it into Koii using Finnie
    */
    await window.koiWallet.registerData(tx.id) // input transaction id
  } catch (err) {
    throw new Error(err.message)
  }
}
