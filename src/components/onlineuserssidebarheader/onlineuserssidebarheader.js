import React from 'react';
import { FaPowerOff } from 'react-icons/fa';

const OnlineUsersSideBarHeader = ({username})=>{
    return (
        <div className="chat-list-info">
            <span className="chat-list-info-username">{username}</span>
            <span className="logout"><FaPowerOff color="red" size={17}/></span>
        </div>  
    )
}

export default OnlineUsersSideBarHeader;