export async function dashboardRander(){
    if(checkAuth()){
        const app = document.getElementById("result");


        
        const Patients = await getData("patients");
        const Revenues = await getData("revenues");
        const Expenses = await getData("expenses");
        const Appointments = await getData("appointments");
        
        let revenueTotal = calcStaticsTotal(Revenues);
        let expensesTotal = calcStaticsTotal(Expenses);

        app.innerHTML = `

<div class="dashboard">
    <nav class="nav-menu">
        <ul class="nav-list">
            <li class="nav-item">
                <a href="#dashboard" class="nav-link active">Dashboard</a>
            </li>
            <li class="nav-item">
                <a href="#patients" class="nav-link">Patients</a>
            </li>
            <li class="nav-item">
                <a href="#appointments" class="nav-link">Appointments</a>
            </li>
            <li class="nav-item">
                <a href="#revenue" class="nav-link">Revenue</a>
            </li>
            <li class="nav-item">
                <a href="#expenses" class="nav-link">Expenses</a>
            </li>
            <li class="nav-item">
                <a href="#reports" class="nav-link">Reports</a>
            </li>
        </ul>
    </nav>

    <div class="content">
        <div class="page-header">
            <h1>Dashboard</h1>
            <a href="#logout" class="logout-btn">Logout</a>
            <div class="clearfix"></div>
        </div>

        <div class="stats-grid">
            <div class="stat-card green">
                <div class="stat-number">`+revenueTotal+`€</div>
                <div class="stat-label">Monthly Revenue</div>
            </div>
            
            <div class="stat-card red">
                <div class="stat-number">`+expensesTotal+`€</div>
                <div class="stat-label">Monthly Expenses</div>
            </div>
            
            <div class="stat-card purple">
                <div class="stat-number">`+(revenueTotal - expensesTotal)+`€</div>
                <div class="stat-label">Net Profit</div>
            </div>
            
            <div class="stat-card orange">
                <div class="stat-number">`+Patients.length+`</div>
                <div class="stat-label">Total Patients</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-number">`+Appointments.length+`</div>
                <div class="stat-label">Appointments This Month</div>
            </div>
        </div>



        <div class="recent-section">
            <h3>Recent Activity</h3>
            
            <div class="recent-item">
                <div class="recent-text">New patient registered: Marie Dupont</div>
                <div class="recent-time">2 hours ago</div>
            </div>
            
            <div class="recent-item">
                <div class="recent-text">Appointment confirmed with Dr Martin</div>
                <div class="recent-time">4 hours ago</div>
            </div>
            
            <div class="recent-item">
                <div class="recent-text">Payment received: 80€ (Consultation)</div>
                <div class="recent-time">Yesterday at 2:30 PM</div>
            </div>
        </div>
    </div>
</div>`;
    } else {
        location.replace("#home");
    }

}

function checkAuth(){
    let getAdmin = JSON.parse(localStorage.getItem("admin"));
    if(getAdmin && getAdmin.auth === "active"){
        return true;
    }
    return false;
}

async function getData(target) {
    try{
        let request = await fetch('src/storage/'+target+'.json');
        let result = await request.json();
        return result;
    }catch(error){
        console.log(error);
        return [];
    }
}

function calcStaticsTotal(target){
    let total = 0;
    const now = new Date();
    let monthLater = now.getTime() - 1000 * 3600 * 24 * 30;
    target.forEach(element => {
        const getDate = new Date(element.date);
        let getDateByMs = getDate.getTime();
        if(getDateByMs >= monthLater){
            total += element.amount;
        }
    });
    return total;
}
