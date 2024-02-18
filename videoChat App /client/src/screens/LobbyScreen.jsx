import React, { useState, useCallback, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import {useNavigate} from "react-router-dom"


function LobbyScreen() {
  const [email,setEmail] = useState('')
  const [room,setRoom] = useState('')
  const navigate = useNavigate()
  const socket = useSocket()

  const handleSubmit = useCallback(
    (e)=>{
      e.preventDefault()
      socket.emit("room:join",{email,room})
    },[email,room,socket]
  )

  const handleJoinRoom = useCallback(({email,room})=>{
    navigate(`/room/${room}`)
  },[])

  useEffect(()=>{
    socket.on("room:join",handleJoinRoom)
  },[socket])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Lobby</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Id: </label>
        <input 
        type="email" 
        id="email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room No: </label>
        <input 
        type="text" 
        id="room"
        value={room}
        onChange={e=>setRoom(e.target.value)}
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default LobbyScreen;
