import { authRander } from "./security/auth.js";
import { homeRander } from "./modules/home.js";
import { dashboardRander } from "./modules/dashboard.js";
import { logout } from "./security/logout.js";
import { patientsRander } from "./modules/patients.js";
import { appointmentsRander } from "./modules/appointments.js";
import { revenueRander } from "./modules/revenue.js";
import { expensesRander } from "./modules/expenses.js";
import { reportsRander } from "./modules/reports.js";


const routers = {
    "#auth": authRander,
    "#home": homeRander,
    "#dashboard": dashboardRander,
    "#logout": logout,
    "#patients": patientsRander,
    "#appointments": appointmentsRander,
    "#revenue": revenueRander,
    "#expenses": expensesRander,
    "#reports": reportsRander
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
        }else{    
            loginBtn.innerText = "Login";
            loginBtn.href = "#auth";
        }
        loginBtn.style.display = 'block';
        
    } else {
        loginBtn.style.display = 'none';
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

