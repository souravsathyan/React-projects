import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../service/peer"

function Room() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [MyStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log("called");
    console.log(email, id, "user joined");
  }, []);

  useEffect(()=>{
    peer.peer.addEventListener('negotiationneeded',async ()=>{
        const offer = await peer.getOffer()
        socket.emit("peer:nego:needed",{offer,to:remoteSocketId})
    })

    return ()=>{
        peer.peer.removeEventListener("negotiationneeded",async ()=>{
            const offer = await peer.getOffer()
            socket.emit("peer:nego:needed",{offer,to:remoteSocketId})
        })
    }
  },[])

  useEffect(()=>{
    peer.peer.addEventListener('track',async ev => {
        const remoteStream = ev.streams
        setRemoteSocketId(remoteStream[0])
    })
  },[])

  const sendStream = ()=>{
    for(const track of MyStream.getTracks()){
        peer.peer.addTrack(track, MyStream)
    }
  }

  useEffect(() => {
    socket.on("user:joined", ({ email, id }) => {
      setRemoteSocketId(id);
    });

    socket.on("incoming:call",async ({from,offer})=>{{
        setRemoteSocketId(from)
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });
        const ans = await peer.getAnswer(offer)
        socket.emit("call:accepted",{to:from, ans})
    }})

    socket.on("call:accepted",({from,ans})=>{
        peer.setLocalDescription(ans)
        sendStream()
    })

    socket.on("peer:nego:needed",async({from,offer})=>{
        const ans =await peer.getAnswer(offer)
        socket.emit('peer:nego:done', {to:from, ans})
    })

    socket.on("peer:nego:final",async ({from,ans})=>{
       await  peer.setLocalDescription(ans)

    })

    return () => {
      socket.off("user:joined");
      socket.off("incoming:call")
      socket.off("call:accepted")
    };
  }, [socket]);

  const handleCallUser = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer()
    socket.emit("user:call", {to:remoteSocketId, offer})
    setMyStream(stream);
  };

  

  return (
    <div>
      <h1>Room</h1>
      <h4>{remoteSocketId ? "Connected" : "No One in Room"}</h4>
      {
        MyStream && <button onClick={sendStream}>Send Stream</button>
      }
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
      {MyStream && (
        <ReactPlayer
          playing
          muted
          height="300px"
          width="500px"
          url={MyStream}
        />
      )}
      {remoteStream && (
        <ReactPlayer
          playing
          muted
          height="300px"
          width="500px"
          url={remoteStream}
        />
      )}
    </div>
  );
}

export default Room;
