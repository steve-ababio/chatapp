import React from 'react';
import OnlineUsersSideBarHeader from '../onlineuserssidebarheader/onlineuserssidebarheader';
import './onlineuserssidebar.css';

const OnlineUsersSideBar = ({onlineusers,selectuser,ischatwindowopened,messagelength,peerIDs,username})=>{

    return(
        <aside className="online-users-sidebar-ctn">
            <OnlineUsersSideBarHeader username={username}/>
            {
                onlineusers.map((onlineuser,idx)=>(
                    <aside className ="online-user-ctn" key={idx} data-peerid={peerIDs[idx]} data-username={onlineuser.username}  onClick={selectuser}>
                        <div className="online-user-indicator-ctn">
                            <div className="online-user-indicator"></div>
                        </div>
                        <div className="online-user-name-ctn">
                            <div className="online-user-name">{onlineuser.username}</div>
                            <div className="user-last-seen">{ onlineuser.lastseen === "active" ? "active" : `Last Seen:${onlineuser.lastseen}`}</div>
                        </div>
                        <div className={(!ischatwindowopened && messagelength > 0 ) ? "msg-count-indicator-show" : null}>
                            {(messagelength === 0) ? "" : messagelength}
                        </div>
                    </aside>
                ))
            }
        </aside>
    )
}
export default OnlineUsersSideBar;
