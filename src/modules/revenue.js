export function revenueRander(){
    if(checkAuth()){
        const app = document.getElementById("result");
        const revenues = JSON.parse(localStorage.getItem("revenues")) || [];
    
    app.innerHTML = `<style>
.revenue-page{background-color:#f9f9f9;min-height:100vh;font-family:Arial,sans-serif}
.nav-menu{background-color:white;padding:0;margin:0;box-shadow:0 2px 4px rgba(0,0,0,0.1);overflow-x:auto}
.nav-list{display:flex;list-style:none;margin:0;padding:0;min-width:600px}
.nav-item{flex:1;text-align:center}
.nav-link{display:block;padding:20px 15px;color:#666;text-decoration:none;border-bottom:3px solid transparent;transition:all 0.2s;font-weight:500}
.nav-link:hover{background-color:#f8f9fa;color:#333}
.nav-link.active{color:#3498db;border-bottom-color:#3498db;background-color:#f8f9fa}
.content{padding:25px}
.page-header{background-color:white;padding:25px;margin-bottom:25px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);display:flex;justify-content:space-between;align-items:center}
.page-title{margin:0;color:#2c3e50;font-size:26px}
.add-btn{background-color:#27ae60;color:white;padding:12px 20px;border:none;border-radius:5px;cursor:pointer;font-weight:bold;font-size:14px}
.add-btn:hover{background-color:#229954}
.summary-section{background-color:white;padding:25px;margin-bottom:25px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);text-align:center}
.summary-section h3{margin:0 0 10px 0;color:#34495e;font-size:18px}
.total-amount{font-size:36px;font-weight:bold;margin:0;color:#27ae60}
.search-section{background-color:white;padding:20px;margin-bottom:25px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1)}
.search-box{width:100%;max-width:400px;padding:12px 15px;border:2px solid #ddd;border-radius:5px;font-size:16px}
.search-box:focus{border-color:#3498db;outline:none}
.revenues-table{background-color:white;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);overflow:hidden}
.table{width:100%;border-collapse:collapse}
.table th{background-color:#34495e;color:white;padding:15px;text-align:left;font-weight:bold}
.table td{padding:15px;border-bottom:1px solid #eee}
.table tr:hover{background-color:#f8f9fa}
.action-btns{display:flex;gap:8px}
.edit-btn{background-color:#3498db;color:white;padding:6px 12px;border:none;border-radius:4px;cursor:pointer;font-size:12px}
.edit-btn:hover{background-color:#2980b9}
.delete-btn{background-color:#e74c3c;color:white;padding:6px 12px;border:none;border-radius:4px;cursor:pointer;font-size:12px}
.delete-btn:hover{background-color:#c0392b}
@media (max-width:768px){.content{padding:15px}.page-header{flex-direction:column;gap:15px;text-align:center}.table{font-size:14px}.table th,.table td{padding:10px 8px}}
.popup-overlay{position:fixed;background:rgba(44,62,80,0.9);backdrop-filter:blur(8px);top:0;left:0;width:100%;height:100%;justify-content:center;align-items:center;z-index:999;display:none}
.revenue-form{background:white;width:90%;max-width:450px;box-shadow:0 20px 60px rgba(0,0,0,0.15);border-radius:15px;padding:40px 30px;position:relative;animation:slideUp 0.3s ease}
@keyframes slideUp{from{opacity:0;transform:translateY(50px)}to{opacity:1;transform:translateY(0)}}
.revenue-form h1{color:#2c3e50;font-size:28px;font-weight:600;margin:0 0 30px 0;text-align:center;position:relative}
.revenue-form h1::after{content:'';position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);width:60px;height:3px;background:linear-gradient(90deg,#3498db,#27ae60);border-radius:2px}
.form-group{margin-bottom:20px;position:relative}
.form-group label{display:block;color:#34495e;font-weight:500;margin-bottom:8px;font-size:14px}
.form-group input,.form-group select,.form-group textarea{width:100%;padding:15px 20px;border:2px solid #e8ecf0;border-radius:10px;font-size:16px;font-family:Arial,sans-serif;transition:all 0.3s ease;background:#fff;box-sizing:border-box}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:#3498db;box-shadow:0 0 0 3px rgba(52,152,219,0.1);transform:translateY(-2px)}
.form-actions{display:flex;gap:15px;margin-top:30px}
.form-actions button{flex:1;padding:15px;border:none;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;transition:all 0.3s ease;text-transform:uppercase;letter-spacing:0.5px}
.btn-primary{background:linear-gradient(135deg,#27ae60,#2ecc71);color:white}
.btn-primary:hover{background:linear-gradient(135deg,#229954,#27ae60);transform:translateY(-2px);box-shadow:0 8px 25px rgba(39,174,96,0.3)}
.btn-edit{background:linear-gradient(135deg,#3498db,#5dade2);color:white}
.btn-edit:hover{background:linear-gradient(135deg,#2980b9,#3498db);transform:translateY(-2px);box-shadow:0 8px 25px rgba(52,152,219,0.3)}
.btn-secondary{background:#95a5a6;color:white}
.btn-secondary:hover{background:#7f8c8d;transform:translateY(-2px);box-shadow:0 8px 25px rgba(149,165,166,0.3)}
</style>

<div class="revenue-page">
    <div id="add-revenue-popup" class="popup-overlay">
        <form id="add-revenue-form" class="revenue-form">
            <h1>Add Revenue</h1>
            <div class="form-group">
                <label for="add-revenue-amount">Amount</label>
                <input type="number" id="add-revenue-amount" placeholder="Enter amount" step="0.01" required>
            </div>
            <div class="form-group">
                <label for="add-revenue-method">Payment Method</label>
                <select id="add-revenue-method" required>
                    <option value="">Select Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Check">Check</option>
                    <option value="Transfer">Transfer</option>
                </select>
            </div>
            <div class="form-group">
                <label for="add-revenue-description">Description</label>
                <input type="text" id="add-revenue-description" placeholder="Enter description" required>
            </div>
            <div class="form-group">
                <label for="add-revenue-date">Date</label>
                <input type="date" id="add-revenue-date" required>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-primary">Add Revenue</button>
                <button type="button" id="close-add-popup" class="btn-secondary">Cancel</button>
            </div>
        </form>
    </div>

    <div id="edit-revenue-popup" class="popup-overlay">
        <form id="edit-revenue-form" class="revenue-form">
            <h1>Edit Revenue</h1>
            <div class="form-group">
                <label for="edit-revenue-amount">Amount</label>
                <input type="number" id="edit-revenue-amount" placeholder="Enter amount" step="0.01" required>
            </div>
            <div class="form-group">
                <label for="edit-revenue-method">Payment Method</label>
                <select id="edit-revenue-method" required>
                    <option value="">Select Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Check">Check</option>
                    <option value="Transfer">Transfer</option>
                </select>
            </div>
            <div class="form-group">
                <label for="edit-revenue-description">Description</label>
                <input type="text" id="edit-revenue-description" placeholder="Enter description" required>
            </div>
            <div class="form-group">
                <label for="edit-revenue-date">Date</label>
                <input type="date" id="edit-revenue-date" required>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-edit">Update Revenue</button>
                <button type="button" id="close-edit-popup" class="btn-secondary">Cancel</button>
            </div>
        </form>
    </div>

    <nav class="nav-menu">
        <ul class="nav-list">
            <li class="nav-item">
                <a href="#dashboard" class="nav-link">Dashboard</a>
            </li>
            <li class="nav-item">
                <a href="#patients" class="nav-link">Patients</a>
            </li>
            <li class="nav-item">
                <a href="#appointments" class="nav-link">Appointments</a>
            </li>
            <li class="nav-item">
                <a href="#revenue" class="nav-link active">Revenue</a>
            </li>
            <li class="nav-item">
                <a href="#expenses" class="nav-link">Expenses</a>
            </li>
        </ul>
    </nav>

    <div class="content">
        <div class="page-header">
            <h1 class="page-title">Revenue Management</h1>
            <button class="add-btn">Add Revenue</button>
        </div>

        <div class="summary-section">
            <h3>Total Revenue</h3>
            <p class="total-amount" id="total-revenue">€0.00</p>
        </div>

        <div class="search-section">
            <input 
                type="text" 
                class="search-box" 
                placeholder="Search by description..."
            >
        </div>

        <div class="revenues-table">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="revenues-tbody">
                    
                </tbody>
            </table>
        </div>
    </div>
</div>`;

    displayRevenues(revenues);
    setupRevenueEventListeners();
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

function setupRevenueEventListeners() {
    const addBtn = document.querySelector('.add-btn');
    const addPopup = document.getElementById('add-revenue-popup');
    const editPopup = document.getElementById('edit-revenue-popup');
    const closeAddBtn = document.getElementById('close-add-popup');
    const closeEditBtn = document.getElementById('close-edit-popup');
    const addForm = document.getElementById('add-revenue-form');
    const editForm = document.getElementById('edit-revenue-form');
    const searchBox = document.querySelector('.search-box');

    addBtn.addEventListener('click', () => {
        addPopup.style.display = 'flex';
        addForm.reset();
        document.getElementById('add-revenue-date').value = new Date().toISOString().split('T')[0];
    });

    closeAddBtn.addEventListener('click', () => {
        addPopup.style.display = 'none';
    });

    closeEditBtn.addEventListener('click', () => {
        editPopup.style.display = 'none';
    });

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addRevenue();
    });

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updateRevenue();
    });

    searchBox.addEventListener('keyup', function() {
        const searchValue = this.value.toLowerCase();
        const revenues = JSON.parse(localStorage.getItem('revenues')) || [];
        
        if (searchValue === '') {
            displayRevenues(revenues);
        } else {
            const filteredRevenues = revenues.filter(revenue => 
                revenue.description.toLowerCase().includes(searchValue)
            );
            displayRevenues(filteredRevenues);
        }
    });

    const tbody = document.getElementById('revenues-tbody');
    tbody.addEventListener('click', (e) => {
        const revenueId = e.target.dataset.revenueId;
        
        if (e.target.classList.contains('edit-btn')) {
            editRevenue(revenueId);
        } else if (e.target.classList.contains('delete-btn')) {
            deleteRevenue(revenueId);
        }
    });
}

function addRevenue() {
    const amount = document.getElementById('add-revenue-amount').value;
    const method = document.getElementById('add-revenue-method').value;
    const description = document.getElementById('add-revenue-description').value;
    const date = document.getElementById('add-revenue-date').value;

    if (!amount || !method || !description || !date) {
        alert('Please fill in all fields');
        return;
    }

    const revenues = JSON.parse(localStorage.getItem('revenues')) || [];
    let newId = 1;
    if (revenues.length > 0) {
        const lastRevenue = revenues[revenues.length - 1];
        const lastIdNumber = lastRevenue.id.replace('REV', '');
        newId = parseInt(lastIdNumber) + 1;
    }

    const newRevenue = {
        id: 'REV' + newId,
        amount: parseFloat(amount),
        method: method,
        description: description,
        date: date,
        createdAt: new Date().toISOString()
    };

    revenues.push(newRevenue);
    localStorage.setItem('revenues', JSON.stringify(revenues));
    displayRevenues(revenues);
    updateTotal(revenues);
    
    document.getElementById('add-revenue-popup').style.display = 'none';
    alert('Revenue added successfully!');
}

function editRevenue(revenueId) {
    const revenues = JSON.parse(localStorage.getItem('revenues')) || [];
    let revenue = null;
    
    for (let i = 0; i < revenues.length; i++) {
        if (revenues[i].id === revenueId) {
            revenue = revenues[i];
            break;
        }
    }
    
    if (!revenue) {
        alert('Revenue not found!');
        return;
    }

    document.getElementById('edit-revenue-amount').value = revenue.amount;
    document.getElementById('edit-revenue-method').value = revenue.method;
    document.getElementById('edit-revenue-description').value = revenue.description;
    document.getElementById('edit-revenue-date').value = revenue.date;

    document.getElementById('edit-revenue-form').dataset.revenueId = revenueId;
    document.getElementById('edit-revenue-popup').style.display = 'flex';
}

function updateRevenue() {
    const form = document.getElementById('edit-revenue-form');
    const revenueId = form.dataset.revenueId;
    
    const amount = document.getElementById('edit-revenue-amount').value;
    const method = document.getElementById('edit-revenue-method').value;
    const description = document.getElementById('edit-revenue-description').value;
    const date = document.getElementById('edit-revenue-date').value;

    if (!amount || !method || !description || !date) {
        alert('Please fill in all fields');
        return;
    }

    const revenues = JSON.parse(localStorage.getItem('revenues')) || [];
    
    for (let i = 0; i < revenues.length; i++) {
        if (revenues[i].id === revenueId) {
            revenues[i].amount = parseFloat(amount);
            revenues[i].method = method;
            revenues[i].description = description;
            revenues[i].date = date;
            break;
        }
    }

    localStorage.setItem('revenues', JSON.stringify(revenues));
    displayRevenues(revenues);
    updateTotal(revenues);
    
    document.getElementById('edit-revenue-popup').style.display = 'none';
    alert('Revenue updated successfully!');
}

function deleteRevenue(revenueId) {
    const revenues = JSON.parse(localStorage.getItem('revenues')) || [];
    const updatedRevenues = revenues.filter(revenue => revenue.id !== revenueId);
    
    localStorage.setItem('revenues', JSON.stringify(updatedRevenues));
    displayRevenues(updatedRevenues);
    updateTotal(updatedRevenues);
}

function displayRevenues(revenues) {
    const tbody = document.getElementById('revenues-tbody');
    
    if (revenues.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#666;">No revenues found</td></tr>';
        return;
    }

    let html = '';
    revenues.forEach(revenue => {
        html += `<tr>
            <td>${revenue.id}</td>
            <td>${revenue.date}</td>
            <td>€${revenue.amount.toFixed(2)}</td>
            <td>${revenue.method}</td>
            <td>${revenue.description}</td>
            <td>
                <div class="action-btns">
                    <button class="edit-btn" data-revenue-id="${revenue.id}">Edit</button>
                    <button class="delete-btn" data-revenue-id="${revenue.id}">Delete</button>
                </div>
            </td>
        </tr>`;
    });
    
    tbody.innerHTML = html;
    updateTotal(revenues);
}

function updateTotal(revenues) {
    const totalRevenue = revenues.reduce((sum, revenue) => sum + revenue.amount, 0);
    document.getElementById('total-revenue').textContent = `€${totalRevenue.toFixed(2)}`;
}