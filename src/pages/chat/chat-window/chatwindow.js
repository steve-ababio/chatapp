import React, { useState,useEffect,useRef} from 'react';
import {VscClose} from 'react-icons/vsc';
import {BsDash} from 'react-icons/bs';
import {IoVideocamOutline} from 'react-icons/io5'
import {ImArrowUp} from 'react-icons/im';
import propTypes from 'prop-types';
import Peer from 'peerjs';
import ChatListArea from '../../../components/chatlist/chatlist';
import { LOCALSTORAGE_GET_ITEM } from '../../../utility/localstorage';
import {websocketevents,peerevents} from '../../../utility/websocketevents'
import VideoPortal from '../../video/videoportal';
import VideoChat from '../../video/videochat';
import './chatwindow.css';

const Chatwindow = (props)=>{
    const chatarearef = useRef();
    const chatinputref = useRef();
    const peerID = useRef();
    const peer = useRef();
    const videostreamref = useRef();
    const answercallref = useRef();
    const callerterminatecallref = useRef();
    const receiverterminatecallref = useRef();

    const [msg,setMsg] = useState("");
    const [msglist,setMsgList] = useState([]);
    const [scrolldif,setScrollDif] = useState(false);
    const [videostreamready,setVideoStreamReady] = useState(false);
    const [callinitiator,setCallInitiator] = useState(false);
    const [cameraaudio,setCameraAudio] = useState(false);

  
    useEffect(()=>{
        peerID.current = LOCALSTORAGE_GET_ITEM("__userID");              
    },[]);
    const terminateCallEvent = (call,conn)=>{
        call.close();
        terminatePeerConnection(conn);
        videostreamref.current.srcObject = null;
        setVideoStreamReady(false);  
     }
    const answerIncomingCall = (call,videostream)=>{
        call.answer(videostream);
        setCallInitiator(true);                           
    }
    useEffect(()=>{   
        if(props.websocket)
        {
            props.websocket.on(websocketevents.PEER_JOINED,()=>{
                if(!peer.current)
                {
                    connectPeerToServer();                 
                }
                peer.current.on(peerevents.PEER_CONNECTION,(conn)=>
                {
                    peer.current.on(peerevents.CALL,async call=>{
                       const videostream = await getCameraDevice(); 
                       setVideoStreamReady(true);   
                       setCallInitiator(false);
                       answercallref.current.addEventListener('click',answerIncomingCall,call,videostream); 
                       receiverterminatecallref.current.addEventListener('click',terminateCallEvent,call,conn);
                       videostreamref.current.srcObject = videostream; 
                       call.on(peerevents.CALL_STREAM,remotevideostream=>
                       {
                            callerterminatecallref.current.addEventListener('click',()=>{                    
                                call.close();             
                                // turnOffCamera(videostream);
                                terminatePeerConnection(conn);   
                            }) 
                           videostreamref.current.srcObject = remotevideostream;
                       })                    
                       
                       conn.on("close",()=>{
                            call.close();
                            terminatePeerConnection(conn);
                       })                      
                   })
                })
                peer.current.on("disconnected",()=>{
                    console.log("peer disconnected");
                })
            })
         }
         return ()=>{             
            console.log(callerterminatecallref)
            console.log(receiverterminatecallref)
            // callerterminatecallref.current.removeEventListener("click",terminateCallEvent);
            // receiverterminatecallref.current.removeEventListener("click",terminateCallEvent);
         }
    },[props.websocket])

    useEffect(()=>{
        if(props.msgdetails !== '')
            setMsgList(prevmsg=>([...prevmsg,props.msgdetails]));
    },[props.msgdetails])

    useEffect(()=>{
        const scrollheight = chatarearef.current.scrollHeight;
        const clientheight = chatarearef.current.clientHeight;
        if(scrollheight > clientheight){
            setScrollDif(true);
            chatarearef.current.scrollTo(0,scrollheight)
        }
    },[msglist]);  

    const getCameraDevice = async ()=>{
        const constraints = {video:true,audio:cameraaudio};
        if(navigator.mediaDevices.getUserMedia && navigator.mediaDevices){
            try{
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                return stream;
            } catch(error){
                console.log(error);
            }
        }
    }
    const handleTxtChats = (e)=>{
        setMsg(e.target.value);
    }
    const sendPrivateMsg = () =>{
        if(msg !=="")
        {
            chatinputref.current.value = "";
            setMsgList(prevmsg => ([...prevmsg,msg]));
            setMsg("");
            props.sendPrivateMsg(msg,props.selectedusername);  
        }      
    }
    const SendChatWithEnterKey = e=>{ 
        if(e.key === "Enter"){
            sendPrivateMsg();
        }
        else
            props.showUserTyping(props.username,props.selectedusername,e)
    }

    const initiateVideoCall = async()=>{
        const videostream = await getCameraDevice(); 
        connectPeerToServer();
        peer.current.on(peerevents.PEER_SERVER_CONN_OPENED,()=>{  
            props.websocket.emit(websocketevents.PEER_CONNECTED,props.selectedusername); 
            const peerconn = peer.current.connect(props.userselectedPeerID);
            peerconn.on(peerevents.PEER_CONN_OPENED,()=>{
                const call = peer.current.call(props.userselectedPeerID,videostream);             
                setVideoStreamReady(true);
                setCallInitiator(true);                                                    
                videostreamref.current.srcObject = videostream;

                call.on(peerevents.CALL_STREAM,remotevideostream=>{
                    videostreamref.current.srcObject = remotevideostream;
                })
                callerterminatecallref.current.addEventListener('click',()=>{                    
                    call.close();
                    turnOffCamera(videostream);
                    terminatePeerConnection(peerconn);   
                }) 
                peerconn.on("close",()=>{
                    call.close();
                    turnOffCamera(videostream);
                    terminatePeerConnection(peerconn);
                })
            })
        })
    }
    const connectPeerToServer = ()=>{
        peer.current = new Peer(peerID.current,{
            host:"127.0.0.1",
            port:"3004",
            path:"/"
        });     
    }
    const terminatePeerConnection = (peerconn)=>{
        peerconn.close();
        peer.current.destroy();
        setVideoStreamReady(false);
    } 
    const turnOffCamera = (videostream)=>{
        videostream.getVideoTracks().forEach(track=>{
            track.stop();
        })
        videostreamref.current.srcObject = null;
    }
    const toggleVideoCallAudio = ()=>{
        setCameraAudio(!cameraaudio);
    }
    const toggleCamera = ()=>{

    }
    const enableCamera = ()=>{

    }
    return(
        <div className={props.showpopupwindow ? "popup-chat-window-ctn show-popup-window" : "popup-chat-window-ctn"} >
            <VideoPortal>
               <VideoChat
                    videostreamready={videostreamready}
                    ref={{videostreamref,answercallref,callerterminatecallref,receiverterminatecallref}}
                    callinitiator={callinitiator}
                    toggleVideoCallAudio={toggleVideoCallAudio}
                    toggleCamera={toggleCamera}
                    enableCamera = {enableCamera}
                />
            </VideoPortal>
            <div className="popup-chat-window-title-ctn">
                <div className="popup-chat-window-title">
                    <div className="popup-chat-window-userinfo" >
                        <div className="popup-chat-window-img"></div>
                        <div className="popup-chat-window-txt">
                            <div className="popup-chat-window-username">{props.selectedusername}</div>
                            <div className="popup-chat-window-active">Active</div>
                        </div>
                    </div>
                    <div className="popup-chat-window-user-typing">{props.showtyping}</div>
                    <div className="popup-chat-window-init-video-call" onClick={initiateVideoCall}>
                        <IoVideocamOutline color="white" size={25} />
                    </div>
                    <div className="popup-chat-window-collapse">
                        <div className="popup-chat-window-min" data-username={props.username}  onClick={props.minimizeChatWindow}>
                            <BsDash size={25} color="white" />                               
                        </div>
                        <div className="popup-chat-window-close"data-username={props.username} onClick={props.closeChatWindow}>
                            <VscClose size={20} color="white" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="popup-chat-window">
                <ChatListArea ref={chatarearef} messages={msglist} scrolldif={scrolldif}/>
                <div className="popup-chat-txt-input-ctn">
                    <input type="text" ref={chatinputref}  className="popup-chat-txt-input" onKeyPress={SendChatWithEnterKey} onChange={handleTxtChats}  placeholder="send a chat"/>
                    <button  className="popup-chat-snd-btn popup-chat-txt-snd-btn"  onClick={sendPrivateMsg} ><ImArrowUp color="white" size={14} /></button>
                </div>
            </div>
        </div>
    )
}

Chatwindow.propTypes = {
    selectedusername:propTypes.string.isRequired,
    userselectedPeerID:propTypes.number.isRequired,
    showUserTyping:propTypes.func.isRequired,
    closeChatWindow:propTypes.func.isRequired,
    showpopupwindow:propTypes.bool.isRequired,
    minimizeChatWindow:propTypes.func.isRequired,
    showtyping:propTypes.string.isRequired,
    sendPrivateMsg:propTypes.func.isRequired,
    msgdetails:propTypes.string.isRequired,
    username:propTypes.string.isRequired,
};
export default Chatwindow;