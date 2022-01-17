import ReactDOM from 'react-dom';

const VideoPortal = (props)=>{    
    return ReactDOM.createPortal(
        props.children,
        document.getElementById("video-portal")
    );       
}
export default VideoPortal;