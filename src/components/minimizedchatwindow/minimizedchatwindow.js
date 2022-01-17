import React from 'react';

const MinimizedChatWindow = ({showminimizedwindow,selectedusername,maximizeChatWindow})=>{
    return(
    <div className={showminimizedwindow  ? "minimized-window-ctn show-minimized-window" : "minimized-window-ctn"} data-username={selectedusername} onClick={maximizeChatWindow}>
        <div className = "minimized-window">
            <div className="min-username">{selectedusername}</div>
        </div>
    </div>
    )
}
export default MinimizedChatWindow;