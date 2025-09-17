import { authRander } from "./security/auth.js";
import { homeRander } from "./modules/home.js";
import { dashboardRander } from "./modules/dashboard.js";
import { logout } from "./security/logout.js";


const routers = {
    "#auth": authRander,
    "#home": homeRander,
    "#dashboard": dashboardRander,
    "#logout": logout
}

function routeAction(){
    const Hash = location.hash || "#home";
    let rander = routers[Hash];
    if(rander){
        rander();
    }else{
        document.getElementById('result').innerHTML = "404";
    }
}

function updateNavbar() {
    const loginBtn = document.getElementById('login-btn');
    const currentHash = location.hash || "#home";
            
    if (currentHash === "#home") {
        if(checkAuth()){
            loginBtn.innerText = "Dashboard";
            loginBtn.href = "#dashboard";
        }
        loginBtn.style.display = 'block';
        
    } else {
        loginBtn.style.display = 'none';
    }
    if (currentHash === "#dashboard") {
        document.getElementsByTagName('ul')[0].innerHTML += '<li id="logout"><a href="#logout">Logout</a></li>';
    }else{     
        document.getElementById("logout").style.display = "none";
    }
}
window.addEventListener('load',routeAction);
window.addEventListener('hashchange',routeAction);

window.addEventListener('load',updateNavbar);
window.addEventListener('hashchange',updateNavbar);

function checkAuth(){
    let getAdmin = JSON.parse(localStorage.getItem("admin"));
    if(getAdmin && getAdmin.auth === "active"){
        return true;
    }
    return false;
}

