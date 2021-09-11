import { useState } from 'react'

import { exportNFT } from './helper'
import './index.css'


const Upload = () => {
  const [file, setFile] = useState({})
  const [title, setTitle] = useState('')
  const [username, setUsername] = useState('')
  const [description, setDescription] = useState('')
  const [isNSFW, setIsNSFW] = useState(false)

  const [clicked, setClicked] = useState(false)

  const handleUploadNFT = async () => {
    try {
      setClicked(true)
      const payload = { file, title, username, description, isNSFW }
      await exportNFT(payload)
      alert('Uploaded')

      setClicked(false)
      setFile({})
      setTitle('')
      setUsername('')
      setDescription('')
      setIsNSFW(false)
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className='upload-wrapper'>
      <input type='file' onChange={(e) => setFile(e.target.files[0])}/>
      <div className='upload-item'>
        <label>Title</label>
        <input onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div className='upload-item'>
        <label>Username</label>
        <input onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div className='upload-item'>
        <label>Description</label>
        <input onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <div className='upload-item'>
        <label>NSFW</label>
        <input type='checkbox' onChange={(e) => setIsNSFW(e.target.value)}/>
      </div>
      <button disabled={clicked} onClick={handleUploadNFT}>Submit</button>
    </div>
  )
}

export default Upload
