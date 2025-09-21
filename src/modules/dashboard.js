export function dashboardRander(){
    if(checkAuth()){
        const app = document.getElementById("result");
        
        const patients = JSON.parse(localStorage.getItem("patients")) || [];
        const revenues = JSON.parse(localStorage.getItem("revenues")) || [];
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        
        const revenueTotal = calcStaticsTotal(revenues);
        const expensesTotal = calcStaticsTotal(expenses);
        
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
                <div class="stat-number">`+patients.length+`</div>
                <div class="stat-label">Total Patients</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-number">`+appointments.length+`</div>
                <div class="stat-label">Appointments This Month</div>
            </div>
        </div>

        <div class="recent-section">
            <h3>Recent Activity</h3>
            <div id="recent-activities"></div>
        </div>
    </div>
</div>`;

        loadRecentActivities();
    } else {
        location.replace("#home");
    }
}

function checkAuth(){
    const getAdmin = JSON.parse(localStorage.getItem("admin"));
    if(getAdmin && getAdmin.auth === "active"){
        return true;
    }
    return false;
}

function calcStaticsTotal(target){
    let total = 0;
    const now = new Date();
    const monthLater = now.getTime() - 1000 * 3600 * 24 * 30;
    target.forEach(element => {
        const getDate = new Date(element.date);
        const getDateByMs = getDate.getTime();
        if(getDateByMs >= monthLater){
            total += element.amount;
        }
    });
    return total;
}

function loadRecentActivities() {
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const revenues = JSON.parse(localStorage.getItem("revenues")) || [];
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    
    const activities = [];

    patients.slice(-5).forEach(patient => {
        activities.push({
            text: `New patient registered: ${patient.fullName}`,
            time: formatTimeAgo(patient.createdAt),
            timestamp: new Date(patient.createdAt).getTime()
        });
    });
    
    revenues.slice(-3).forEach(revenue => {
        activities.push({
            text: `Payment received: ${revenue.amount}€ (${revenue.description})`,
            time: formatTimeAgo(revenue.createdAt),
            timestamp: new Date(revenue.createdAt).getTime()
        });
    });
    
    expenses.slice(-3).forEach(expense => {
        activities.push({
            text: `Expense recorded: ${expense.amount}€ (${expense.description})`,
            time: formatTimeAgo(expense.createdAt),
            timestamp: new Date(expense.createdAt).getTime()
        });
    });
    
    appointments.slice(-3).forEach(appointment => {
        const patients = JSON.parse(localStorage.getItem("patients")) || [];
        const patient = patients.find(p => p.id === appointment.patientId);
        const patientName = patient ? patient.fullName : 'Unknown Patient';
        activities.push({
            text: `Appointment scheduled with ${patientName}`,
            time: formatTimeAgo(appointment.createdAt),
            timestamp: new Date(appointment.createdAt).getTime()
        });
    });
    
    activities.sort((a, b) => b.timestamp - a.timestamp);
    const recentActivities = activities.slice(0, 8);
    
    const container = document.getElementById('recent-activities');
    
    if (recentActivities.length === 0) {
        container.innerHTML = `
            <div class="recent-item">
                <div class="recent-text">No recent activity found</div>
                <div class="recent-time">Start by adding patients or appointments</div>
            </div>
        `;
        return;
    }
    
    let html = '';
    recentActivities.forEach(activity => {
        html += `
            <div class="recent-item">
                <div class="recent-text">${activity.text}</div>
                <div class="recent-time">${activity.time}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function formatTimeAgo(dateString) {
    if (!dateString) return 'Recently';
    
    const date = new Date(dateString);
    return date.toLocaleDateString();
}