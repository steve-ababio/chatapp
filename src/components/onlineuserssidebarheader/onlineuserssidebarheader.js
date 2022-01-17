import React from 'react';
import { FaPowerOff } from 'react-icons/fa';
import './onlineusersidebarheader.css';

const OnlineUsersSideBarHeader = ({username})=>{
    function logout(){
        
    }
    return (
        <div className="sidebar-header">
            <span className="online-user-username">{username}</span>
            <span className="logout" title="logout" onClick={logout}><FaPowerOff color="red" size={17}/></span>
        </div>  
    )
}
export default OnlineUsersSideBarHeader;