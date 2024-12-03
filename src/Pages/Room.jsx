import React, { useEffect ,useCallback} from 'react'
import {useSocket} from "../providers/socket"
import {usePeer} from "../providers/Peer"



const RoomPage = () => {
    const {socket}=useSocket();
    const {peer,createOffer,createAnswer, setRemoteAns }=usePeer;


    const handleNewUserJoined=useCallback (
      async (data)=>{
        const {emailId}=data;
        console.log('new user joined',emailId);
        const offer=await createOffer();
        socket.emit('call-user',{emailId,offer})
    },[createOffer,socket]
  )


  const handleIncommingCall=useCallback (
    async (data)=>{
     const {from,offer}=data;
     console.log("incoming call from",from,offer);
     const ans=await createAnswer(offer);
     socket.emit('call-accept',{emailId:from,ans})
  },[createAnswer,socket]
)

const handleCallAccepted=useCallback(async (data)=>{
  const {ans}=data;
  await setRemoteAns(ans)
},[setRemoteAns])


    useEffect(()=>{
        socket.on('user-joined',handleNewUserJoined)
        socket.on('incomming-call',handleIncommingCall)
        socket.on('call-accepted',handleCallAccepted)

        return ()=>{
          socket.off('user-joined',handleNewUserJoined);
          socket.off('incomming-call',handleIncommingCall)
        }
    },[handleNewUserJoined,handleCallAccepted,handleIncommingCall,socket])



  return (
    <div className='room-page-container'>Page</div>
  )
}




export default RoomPage