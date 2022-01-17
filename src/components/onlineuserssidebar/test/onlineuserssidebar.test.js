import {unmountComponentAtNode,render} from 'react-dom';
import { act} from 'react-dom/test-utils'
import OnlineUsersSideBar from '../onlineuserssidebar';

let container = null;
beforeEach(()=>{
    container = document.createElement("div");
    document.body.appendChild(container);
})
afterEach(()=>{
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

it("render online users and unread chat count",()=>{
    const onlineusers = [
        {username:"Jessica",lastseen:Date.now()},
        {username:"Mark",lastseen:Date.now()},
        {username:"James",lastseen:Date.now()}
    ]
    const peerIDs = ["123","456","789"];
    
    act(()=>{
        render(<OnlineUsersSideBar
                onlineusers={onlineusers}
                messagelength={0} 
                peerIDs={peerIDs}
                ischatwindowopened={false}
          />,container);
    })
    const onlineuser1 = document.querySelectorAll(".online-user-name")[0].textContent;
    const onlineuser2 = document.querySelectorAll(".online-user-name")[1].textContent;
    const onlineuser3 = document.querySelectorAll(".online-user-name")[2].textContent;
    expect(onlineuser1).toBe("Jessica");
    expect(onlineuser2).toBe("Mark");
    expect(onlineuser3).toBe("James");

    act(()=>{
        render(<OnlineUsersSideBar
            onlineusers={onlineusers}
            messagelength={0} 
            peerIDs={peerIDs}
            ischatwindowopened={false}
      />,container);
    })
    const onlineusermsgcount1 = document.querySelectorAll(".online-user-ctn")[0].lastChild.textContent;
    expect(onlineusermsgcount1).toBe("")

    act(()=>{
        render(<OnlineUsersSideBar
            onlineusers={onlineusers}
            messagelength={3} 
            peerIDs={peerIDs}
            ischatwindowopened={false}
      />,container);
    })
    const onlineusermsgcount2 = document.querySelectorAll(".online-user-ctn")[0].lastChild.textContent;
    expect(onlineusermsgcount2).toBe("3");

    act(()=>{
        render(<OnlineUsersSideBar
            onlineusers={onlineusers}
            messagelength={3} 
            peerIDs={peerIDs}
            ischatwindowopened={true}
      />,container);
    })
    const onlineusermsgcount3 = document.querySelectorAll(".online-user-ctn")[0].lastChild.textContent;
    expect(onlineusermsgcount3).toBe("3")
})

