import React from 'react';
import './chatlist.css';

const ChatListArea = React.forwardRef(({messages,scrolldif},chatarearef)=>{
     return(
        <div className="popup-chat-area">
            <div className={scrolldif ? "popup-chat-user-chats flex flex-column chat-area-scrolling": "popup-chat-user-chats flex flex-column"} ref={chatarearef}>
                {                    
                    messages.map((msginfo,idx)=>{
                        if(msginfo.to)
                        {
                            return <div className="popup-remote-chats" key={idx}>{msginfo.content}</div>
                        }
                        return <div className="popup-local-chats" key={idx}>{msginfo}</div>
                    })
                }
            </div>
        </div>
    )
});

export default ChatListArea;