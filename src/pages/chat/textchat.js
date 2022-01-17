import React, { useEffect, useRef,useState } from 'react';
import {io} from 'socket.io-client';
import { URL } from '../../utility/url';
import { websocketevents } from '../../utility/websocketevents';
import Chatwindow from './chat-window/chatwindow';
import useLocalStorage from '../../hooks/uselocalstorage';
import { LOCALSTORAGE_GET_ITEM} from '../../utility/localstorage';

import './textchat.css';
import OnlineUsersSideBar from '../../components/onlineuserssidebar/onlineuserssidebar';
import MinimizedChatWindow from '../../components/minimizedchatwindow/minimizedchatwindow';

const AUTO_CONNECT = true;

const Textchat = ()=>{
    const socket = useRef(null);
    const peerID = useRef();

    const [selectedusername,setSelectedUsername] = useState("");
    const [username,setUsername] = useState("");
    const [userselectedPeerID,setUserSelectedPeerID] = useState("")
    const [msgdetails,setMsgDetails] = useState("");
    const [onlineusers,setOnlineUsers] = useLocalStorage("onlineusers",[])
    const [peerIDs,setPeerIDs] = useLocalStorage("onlineUsersPeerIDs",[])
    const [showtyping,setUserTyping] = useState("");
    const [showpopupwindow,setShowPopupWindow] = useState(false);
    const [ischatwindowopened,setChatWindowOpened] = useState(false);
    const [showminimizedwindow,setShowMinimizedWindow] = useState(false);

    useEffect(()=>{
        const username_  = LOCALSTORAGE_GET_ITEM("user_name");
        setUsername(username_);
        peerID.current = LOCALSTORAGE_GET_ITEM("__userID");
    },[])
    useEffect(()=>{
        socket.current = io(URL.WEBSOCKET_URL,{autoConnect:AUTO_CONNECT});
        const username = LOCALSTORAGE_GET_ITEM("user_name");
        socket.current.auth = {...socket.current.auth,username};
        socket.current.on(websocketevents.SOCKET_CONNECTED,()=>{
            socket.current.emit(websocketevents.USER_ONLINE,username,peerID.current);
        });
        socket.current.on(websocketevents.USER_ONLINE,users=>{    
            peerIDs.current = users.peerIDs.filter(peerid=>peerid !== peerID.current);
            setPeerIDs(peerIDs.current);
            const currentonlineusers = users.onlineusers.filter(user_username=>user_username !== username).map(username=>({username:username,lastseen:"active"}));
            setOnlineUsers(currentonlineusers);  
        })
        socket.current.on(websocketevents.PRIVATE_MESSAGE,({from,to,content})=>{
            const msgdetails = {from,to,content};
                setMsgDetails(msgdetails);
          })
        socket.current.on(websocketevents.TYPING,username=>{
            setUserTyping(username+" is typing");
            setTimeout(()=>{
                setUserTyping("")
            },2000)
        })
        socket.current.on(websocketevents.REMOVE_TYPING,()=>{
            setUserTyping("");
        })
        socket.current.on(websocketevents.USER_OFFLINE,offline_user=>{
            const currentonlineusers = onlineusers.map(user=>{
                if(Object.is(user.username,offline_user.username)){
                    user.lastseen = offline_user.lastseen;
                }
                return user;
            })
            setOnlineUsers(currentonlineusers);
        })
        return ()=>{
            socket.current.disconnect();
        }
    },[setOnlineUsers])
    const showUserTyping = (username,targetusername) =>{
        socket.current.emit(websocketevents.TYPING,username,targetusername);
    }
    const sendPrivateMsg = (msg,remoteusername) =>{
        const username = LOCALSTORAGE_GET_ITEM("user_name"); 
        socket.current.emit(websocketevents.PRIVATE_MESSAGE,{content:msg,from:username,to:remoteusername})
    }
 
    const selectuser = e=>{
        const username = e.currentTarget.dataset.username;     
        const peerID = e.currentTarget.dataset.peerid;  
        setShowPopupWindow(true);
        setChatWindowOpened(true);
        setSelectedUsername(username);
        setUserSelectedPeerID(peerID);        
    } 
    const closeChatWindow = ()=>{
        setShowPopupWindow(false);
    }
    const minimizeChatWindow = () =>{
        setShowMinimizedWindow(true);
        closeChatWindow(); 
    }
    const maximizeChatWindow =() =>{
        setShowMinimizedWindow(false);
        setShowPopupWindow(true);
    }

    return(
        <div className="textchat-ctn">
            <OnlineUsersSideBar
                onlineusers={onlineusers}
                selectuser={selectuser}
                ischatwindowopened={ischatwindowopened}
                messagelength={msgdetails.length}
                peerIDs={peerIDs}
                username={username}
            />
            <div className ="popup-chat-window-grid">                                 
                <Chatwindow 
                    selectedusername={selectedusername} 
                    userselectedPeerID={userselectedPeerID} 
                    showUserTyping={showUserTyping}
                    closeChatWindow={closeChatWindow} 
                    showpopupwindow={showpopupwindow}
                    minimizeChatWindow={minimizeChatWindow} 
                    showtyping={showtyping}
                    sendPrivateMsg={sendPrivateMsg}
                    msgdetails={msgdetails}
                    websocket={socket.current}
                    username = {username}
                />
            </div>
            <MinimizedChatWindow
                showminimizedwindow={showminimizedwindow}
                selectedusername={selectedusername}
                maximizeChatWindow={maximizeChatWindow}
             />
        </div>
    )
}
export default Textchat;