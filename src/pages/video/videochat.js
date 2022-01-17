import React, { forwardRef } from 'react';
import './videochat.css';
import {RiCameraSwitchLine} from 'react-icons/ri';
import {FiCameraOff} from 'react-icons/fi';
import {AiOutlineAudioMuted} from 'react-icons/ai';
import {MdCallEnd} from 'react-icons/md';
import {IoCall} from 'react-icons/io5';

const VideoChat = forwardRef((props,ref)=>{
    
    const{videostreamref,answercallref,callerterminatecallref,receiverterminatecallref} = ref;
    return(
        <div className={props.videostreamready ? "remote-user-video-stream-ctn show-video-stream":"remote-user-video-stream-ctn"}>
            <video ref={videostreamref} id="remote-user-video-stream" autoPlay></video>
            {
                (props.callinitiator)?
                <div className="video-chat-controls-ctn">
                    <div className="video-chat-controls">
                        <div className="video-chat-control-btn-ctn">
                            <button className="video-chat-btn video-chat-camera-toggle">
                                <RiCameraSwitchLine color="white" size={30} />
                            </button>
                        </div>

                        <div className="video-chat-control-btn-ctn">
                            <button  className="video-chat-btn video-chat-camera-enable">
                                <FiCameraOff color="white" size={25} />
                            </button>
                        </div>
                        <div onClick={()=>props.toggleVideoCallAudio()} className="video-chat-control-btn-ctn">
                            <button  className="video-chat-btn video-chat-audio-toggle">
                                <AiOutlineAudioMuted color="white" size={25} />
                            </button>
                        </div>
                        <div className="video-chat-control-btn-ctn">
                            <button  ref={callerterminatecallref} className="video-chat-call-terminate-btn">
                                <MdCallEnd size={30} color="white" />
                            </button>                        
                        </div>
                    </div>
                </div>:
                <div className="video-chat-controls-ctn">
                    <div className="video-chat-controls">
                        <div className="video-chat-answer">
                            <button className="video-chat-answer-btn" ref={answercallref}>
                                <IoCall size={35} color="white" />
                            </button>
                        </div>
                        <div className="video-chat-call-terminate">
                            <button className="video-chat-call-terminate-btn" ref={receiverterminatecallref}>
                                <MdCallEnd size={34} color="white" />
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
})
export default VideoChat;