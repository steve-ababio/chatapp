import {unmountComponentAtNode,render} from 'react-dom'
import { act} from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../navbar';
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

it("can renders navbar with login, signup and home if user is not authenticated",()=>{
    act(()=>{
         render(<BrowserRouter>
            ```<NavBar isauth={false} />
        ``` </BrowserRouter>,container)
        
    })
    const hometext = container.querySelector(".home-nav-ctn").textContent;
    const logintext = container.querySelectorAll(".auth-nav-list")[0].textContent;
    const signuptext = container.querySelectorAll(".auth-nav-list")[1].textContent;
    
    expect(hometext).toBe("Home");
    expect(logintext).toBe("Login");
    expect(signuptext).toBe("SIGNUP");
})
it("can renders navbar with  username and logout button if user is authenticated",()=>{
    act(()=>{
         render(<BrowserRouter>
            ```<NavBar username="steve" isauth={true} />
        ``` </BrowserRouter>,container)
        
    })
    const usernametext = container.querySelector(".nav-username").textContent;
    const logouttext = container.querySelector(".nav-logout-btn").textContent;
 
    expect(usernametext).toBe("steve");
    expect(logouttext).toBe("Logout");
})
