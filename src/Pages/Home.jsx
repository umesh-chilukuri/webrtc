import React, { useEffect, useState,useCallback } from 'react'
import { useSocket } from '../providers/socket'
import { useNavigate } from 'react-router-dom'





const Home = () => {



  const {socket}=useSocket()
const [email,setemail]=useState();
const [roomId,setroomId]=useState();
const navigate=useNavigate();

const handleroomjoined=useCallback( ({roomId})=>{
  console.log('Room Joined',roomId);
  navigate(`/room/${roomId}`);

},[navigate])

useEffect(()=>{
  socket.on('joined-room',handleroomjoined)

  return ()=>{
    socket.off('joined-room',handleroomjoined) 
  }
},[socket,navigate])


const handlejoinRoom=()=>{
  socket.emit('join-room',{emailId:email,roomId})

}

 
  socket.emit('join-room',{roomId:'1',emailId:'bot@gmail.com'})


  return (
    <div className='homepage-container'>
        
        <div className='input-container'>
            <input  value={email} onChange={e=>setemail(e.target.value)} type='email' placeholder='enter email'></input>
            <input value={roomId} onChange={e=>setroomId(e.target.value)} type='text' placeholder='enter room code'></input>
            <button onClick={handlejoinRoom}>enter room</button>
        </div>
        
     </div>
  )
}

export default Home