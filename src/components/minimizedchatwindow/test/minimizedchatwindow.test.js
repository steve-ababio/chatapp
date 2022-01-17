import {unmountComponentAtNode,render} from 'react-dom'
import { act} from 'react-dom/test-utils'
import MinimizedChatWindow from '../minimizedchatwindow';

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

it("renders minimized chat window",()=>{
    act(()=>{
        render(<MinimizedChatWindow showminimizedwindow={true} selectedusername="steve" />,container);
    })
    const containsClass1 = container.firstElementChild.classList.contains("minimized-window-ctn");
    const containsClass2 = container.firstElementChild.classList.contains("show-minimized-window");
    const usernamectn = document.querySelector(".min-username").textContent; 
    expect(containsClass1).toBe(true);
    expect(containsClass2).toBe(true);
    expect(usernamectn).toBe("steve"); 

    act(()=>{
        render(<MinimizedChatWindow showminimizedwindow={false} selectedusername="james" />,container);
    })
    const containsClass3 = container.firstElementChild.classList.contains("minimized-window-ctn");
    const containsClass4 = container.firstElementChild.classList.contains("show-minimized-window"); 
    const usernamectn2 = document.querySelector(".min-username").textContent; 
    expect(containsClass3).toBe(true);
    expect(containsClass4).toBe(false);
    expect(usernamectn2).toBe("james"); 
})