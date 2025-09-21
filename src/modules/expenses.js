export function expensesRander(){
    if(checkAuth()){
        const app = document.getElementById("result");
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    
    app.innerHTML = `<style>
.expenses-page{background-color:#f9f9f9;min-height:100vh;font-family:Arial,sans-serif}
.nav-menu{background-color:white;padding:0;margin:0;box-shadow:0 2px 4px rgba(0,0,0,0.1);overflow-x:auto}
.nav-list{display:flex;list-style:none;margin:0;padding:0;min-width:600px}
.nav-item{flex:1;text-align:center}
.nav-link{display:block;padding:20px 15px;color:#666;text-decoration:none;border-bottom:3px solid transparent;transition:all 0.2s;font-weight:500}
.nav-link:hover{background-color:#f8f9fa;color:#333}
.nav-link.active{color:#3498db;border-bottom-color:#3498db;background-color:#f8f9fa}
.content{padding:25px}
.page-header{background-color:white;padding:25px;margin-bottom:25px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);display:flex;justify-content:space-between;align-items:center}
.page-title{margin:0;color:#2c3e50;font-size:26px}
.add-btn{background-color:#e74c3c;color:white;padding:12px 20px;border:none;border-radius:5px;cursor:pointer;font-weight:bold;font-size:14px}
.add-btn:hover{background-color:#c0392b}
.summary-section{background-color:white;padding:25px;margin-bottom:25px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);text-align:center}
.summary-section h3{margin:0 0 10px 0;color:#34495e;font-size:18px}
.total-amount{font-size:36px;font-weight:bold;margin:0;color:#e74c3c}
.search-section{background-color:white;padding:20px;margin-bottom:25px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1)}
.search-box{width:100%;max-width:400px;padding:12px 15px;border:2px solid #ddd;border-radius:5px;font-size:16px}
.search-box:focus{border-color:#3498db;outline:none}
.expenses-table{background-color:white;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);overflow:hidden}
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
.expense-form{background:white;width:90%;max-width:450px;box-shadow:0 20px 60px rgba(0,0,0,0.15);border-radius:15px;padding:40px 30px;position:relative;animation:slideUp 0.3s ease}
@keyframes slideUp{from{opacity:0;transform:translateY(50px)}to{opacity:1;transform:translateY(0)}}
.expense-form h1{color:#2c3e50;font-size:28px;font-weight:600;margin:0 0 30px 0;text-align:center;position:relative}
.expense-form h1::after{content:'';position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);width:60px;height:3px;background:linear-gradient(90deg,#e74c3c,#ec7063);border-radius:2px}
.form-group{margin-bottom:20px;position:relative}
.form-group label{display:block;color:#34495e;font-weight:500;margin-bottom:8px;font-size:14px}
.form-group input,.form-group select,.form-group textarea{width:100%;padding:15px 20px;border:2px solid #e8ecf0;border-radius:10px;font-size:16px;font-family:Arial,sans-serif;transition:all 0.3s ease;background:#fff;box-sizing:border-box}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:#3498db;box-shadow:0 0 0 3px rgba(52,152,219,0.1);transform:translateY(-2px)}
.form-actions{display:flex;gap:15px;margin-top:30px}
.form-actions button{flex:1;padding:15px;border:none;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;transition:all 0.3s ease;text-transform:uppercase;letter-spacing:0.5px}
.btn-expense{background:linear-gradient(135deg,#e74c3c,#ec7063);color:white}
.btn-expense:hover{background:linear-gradient(135deg,#c0392b,#e74c3c);transform:translateY(-2px);box-shadow:0 8px 25px rgba(231,76,60,0.3)}
.btn-edit{background:linear-gradient(135deg,#3498db,#5dade2);color:white}
.btn-edit:hover{background:linear-gradient(135deg,#2980b9,#3498db);transform:translateY(-2px);box-shadow:0 8px 25px rgba(52,152,219,0.3)}
.btn-secondary{background:#95a5a6;color:white}
.btn-secondary:hover{background:#7f8c8d;transform:translateY(-2px);box-shadow:0 8px 25px rgba(149,165,166,0.3)}
</style>

<div class="expenses-page">
    <div id="add-expense-popup" class="popup-overlay">
        <form id="add-expense-form" class="expense-form">
            <h1>Add Expense</h1>
            <div class="form-group">
                <label for="add-expense-amount">Amount</label>
                <input type="number" id="add-expense-amount" placeholder="Enter amount" step="0.01" required>
            </div>
            <div class="form-group">
                <label for="add-expense-category">Category</label>
                <select id="add-expense-category" required>
                    <option value="">Select Category</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Supplies">Supplies</option>
                    <option value="Rent">Rent</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Staff">Staff</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="add-expense-description">Description</label>
                <input type="text" id="add-expense-description" placeholder="Enter description" required>
            </div>
            <div class="form-group">
                <label for="add-expense-date">Date</label>
                <input type="date" id="add-expense-date" required>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-expense">Add Expense</button>
                <button type="button" id="close-add-popup" class="btn-secondary">Cancel</button>
            </div>
        </form>
    </div>

    <div id="edit-expense-popup" class="popup-overlay">
        <form id="edit-expense-form" class="expense-form">
            <h1>Edit Expense</h1>
            <div class="form-group">
                <label for="edit-expense-amount">Amount</label>
                <input type="number" id="edit-expense-amount" placeholder="Enter amount" step="0.01" required>
            </div>
            <div class="form-group">
                <label for="edit-expense-category">Category</label>
                <select id="edit-expense-category" required>
                    <option value="">Select Category</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Supplies">Supplies</option>
                    <option value="Rent">Rent</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Staff">Staff</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="edit-expense-description">Description</label>
                <input type="text" id="edit-expense-description" placeholder="Enter description" required>
            </div>
            <div class="form-group">
                <label for="edit-expense-date">Date</label>
                <input type="date" id="edit-expense-date" required>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-edit">Update Expense</button>
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
                <a href="#revenue" class="nav-link">Revenue</a>
            </li>
            <li class="nav-item">
                <a href="#expenses" class="nav-link active">Expenses</a>
            </li>
        </ul>
    </nav>

    <div class="content">
        <div class="page-header">
            <h1 class="page-title">Expenses Management</h1>
            <button class="add-btn">Add Expense</button>
        </div>

        <div class="summary-section">
            <h3>Total Expenses</h3>
            <p class="total-amount" id="total-expenses">€0.00</p>
        </div>

        <div class="search-section">
            <input 
                type="text" 
                class="search-box" 
                placeholder="Search by description..."
            >
        </div>

        <div class="expenses-table">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="expenses-tbody">
                    
                </tbody>
            </table>
        </div>
    </div>
</div>`;

    displayExpenses(expenses);
    setupExpenseEventListeners();
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

function setupExpenseEventListeners() {
    const addBtn = document.querySelector('.add-btn');
    const addPopup = document.getElementById('add-expense-popup');
    const editPopup = document.getElementById('edit-expense-popup');
    const closeAddBtn = document.getElementById('close-add-popup');
    const closeEditBtn = document.getElementById('close-edit-popup');
    const addForm = document.getElementById('add-expense-form');
    const editForm = document.getElementById('edit-expense-form');
    const searchBox = document.querySelector('.search-box');

    addBtn.addEventListener('click', () => {
        addPopup.style.display = 'flex';
        addForm.reset();
        document.getElementById('add-expense-date').value = new Date().toISOString().split('T')[0];
    });

    closeAddBtn.addEventListener('click', () => {
        addPopup.style.display = 'none';
    });

    closeEditBtn.addEventListener('click', () => {
        editPopup.style.display = 'none';
    });

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addExpense();
    });

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updateExpense();
    });

    searchBox.addEventListener('keyup', function() {
        const searchValue = this.value.toLowerCase();
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        
        if (searchValue === '') {
            displayExpenses(expenses);
        } else {
            const filteredExpenses = expenses.filter(expense => 
                expense.description.toLowerCase().includes(searchValue)
            );
            displayExpenses(filteredExpenses);
        }
    });

    const tbody = document.getElementById('expenses-tbody');
    tbody.addEventListener('click', (e) => {
        const expenseId = e.target.dataset.expenseId;
        
        if (e.target.classList.contains('edit-btn')) {
            editExpense(expenseId);
        } else if (e.target.classList.contains('delete-btn')) {
            deleteExpense(expenseId);
        }
    });
}

function addExpense() {
    const amount = document.getElementById('add-expense-amount').value;
    const category = document.getElementById('add-expense-category').value;
    const description = document.getElementById('add-expense-description').value;
    const date = document.getElementById('add-expense-date').value;

    if (!amount || !category || !description || !date) {
        alert('Please fill in all fields');
        return;
    }

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let newId = 1;
    if (expenses.length > 0) {
        const lastExpense = expenses[expenses.length - 1];
        const lastIdNumber = lastExpense.id.replace('EXP', '');
        newId = parseInt(lastIdNumber) + 1;
    }

    const newExpense = {
        id: 'EXP' + newId,
        amount: parseFloat(amount),
        category: category,
        description: description,
        date: date,
        createdAt: new Date().toISOString()
    };

    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses(expenses);
    updateTotal(expenses);
    
    document.getElementById('add-expense-popup').style.display = 'none';
    alert('Expense added successfully!');
}

function editExpense(expenseId) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let expense = null;
    
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].id === expenseId) {
            expense = expenses[i];
            break;
        }
    }
    
    if (!expense) {
        alert('Expense not found!');
        return;
    }

    document.getElementById('edit-expense-amount').value = expense.amount;
    document.getElementById('edit-expense-category').value = expense.category;
    document.getElementById('edit-expense-description').value = expense.description;
    document.getElementById('edit-expense-date').value = expense.date;

    document.getElementById('edit-expense-form').dataset.expenseId = expenseId;
    document.getElementById('edit-expense-popup').style.display = 'flex';
}

function updateExpense() {
    const form = document.getElementById('edit-expense-form');
    const expenseId = form.dataset.expenseId;
    
    const amount = document.getElementById('edit-expense-amount').value;
    const category = document.getElementById('edit-expense-category').value;
    const description = document.getElementById('edit-expense-description').value;
    const date = document.getElementById('edit-expense-date').value;

    if (!amount || !category || !description || !date) {
        alert('Please fill in all fields');
        return;
    }

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].id === expenseId) {
            expenses[i].amount = parseFloat(amount);
            expenses[i].category = category;
            expenses[i].description = description;
            expenses[i].date = date;
            break;
        }
    }

    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses(expenses);
    updateTotal(expenses);
    
    document.getElementById('edit-expense-popup').style.display = 'none';
    alert('Expense updated successfully!');
}

function deleteExpense(expenseId) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const updatedExpenses = expenses.filter(expense => expense.id !== expenseId);
    
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    displayExpenses(updatedExpenses);
    updateTotal(updatedExpenses);
}

function displayExpenses(expenses) {
    const tbody = document.getElementById('expenses-tbody');
    
    if (expenses.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#666;">No expenses found</td></tr>';
        return;
    }

    let html = '';
    expenses.forEach(expense => {
        html += `<tr>
            <td>${expense.id}</td>
            <td>${expense.date}</td>
            <td>€${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.description}</td>
            <td>
                <div class="action-btns">
                    <button class="edit-btn" data-expense-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-expense-id="${expense.id}">Delete</button>
                </div>
            </td>
        </tr>`;
    });
    
    tbody.innerHTML = html;
    updateTotal(expenses);
}

function updateTotal(expenses) {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('total-expenses').textContent = `€${totalExpenses.toFixed(2)}`;
}