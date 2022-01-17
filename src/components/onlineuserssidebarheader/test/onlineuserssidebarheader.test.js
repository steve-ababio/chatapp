import { unmountComponentAtNode,render } from 'react-dom';
import { act} from 'react-dom/test-utils'
import OnlineUsersSideBarHeader from '../onlineuserssidebarheader';

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
it("renders online users sidebar header with current user username",()=>{
    act(()=>{
        render(<OnlineUsersSideBarHeader username = "steve"/>,
        container)
    });

    const sidebarheaderusername = container.querySelector('.chat-list-info-username').textContent;
    expect(sidebarheaderusername).toBe("steve");

})