export function patientsRander(){
    const app = document.getElementById("result");
    app.innerHTML = `<style>
.patients-page {
    background-color: #f9f9f9;
    min-height: 100vh;
    font-family: Arial, sans-serif;
}

.nav-menu {
    background-color: white;
    padding: 0;
    margin: 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    overflow-x: auto;
}

.nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    min-width: 600px;
}

.nav-item {
    flex: 1;
    text-align: center;
}

.nav-link {
    display: block;
    padding: 20px 15px;
    color: #666;
    text-decoration: none;
    border-bottom: 3px solid transparent;
    transition: all 0.2s;
    font-weight: 500;
}

.nav-link:hover {
    background-color: #f8f9fa;
    color: #333;
}

.nav-link.active {
    color: #3498db;
    border-bottom-color: #3498db;
    background-color: #f8f9fa;
}

.content {
    padding: 25px;
}

.page-header {
    background-color: white;
    padding: 25px;
    margin-bottom: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.page-title {
    margin: 0;
    color: #2c3e50;
    font-size: 26px;
}

.add-btn {
    background-color: #27ae60;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
}

.add-btn:hover {
    background-color: #229954;
}

.search-section {
    background-color: white;
    padding: 20px;
    margin-bottom: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.search-box {
    width: 100%;
    max-width: 400px;
    padding: 12px 15px;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

.search-box:focus {
    border-color: #3498db;
    outline: none;
}

.patients-table {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    overflow: hidden;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th {
    background-color: #34495e;
    color: white;
    padding: 15px;
    text-align: left;
    font-weight: bold;
}

.table td {
    padding: 15px;
    border-bottom: 1px solid #eee;
}

.table tr:hover {
    background-color: #f8f9fa;
}

.action-btns {
    display: flex;
    gap: 8px;
}

.edit-btn {
    background-color: #3498db;
    color: white;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
}

.edit-btn:hover {
    background-color: #2980b9;
}

.delete-btn {
    background-color: #e74c3c;
    color: white;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
}

.delete-btn:hover {
    background-color: #c0392b;
}

.history-btn {
    background-color: #f39c12;
    color: white;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
}

.history-btn:hover {
    background-color: #e67e22;
}

@media (max-width: 768px) {
    .content {
        padding: 15px;
    }
    
    .page-header {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
    
    .table {
        font-size: 14px;
    }
    
    .table th,
    .table td {
        padding: 10px 8px;
    }
}
</style>

<div class="patients-page">
    <nav class="nav-menu">
        <ul class="nav-list">
            <li class="nav-item">
                <a href="#dashboard" class="nav-link">Dashboard</a>
            </li>
            <li class="nav-item">
                <a href="#patients" class="nav-link active">Patients</a>
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
            <h1 class="page-title">Patients Management</h1>
            <button class="add-btn">Add New Patient</button>
        </div>

        <div class="search-section">
            <input 
                type="text" 
                class="search-box" 
                placeholder="Search patients by name or phone..."
            >
        </div>

        <div class="patients-table">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>PAT001</td>
                        <td>Marie Dupont</td>
                        <td>+33 1 23 45 67 89</td>
                        <td>marie.dupont@email.com</td>
                        <td>Allergic to penicillin. Regular blood pressure monitoring needed.</td>
                        <td>
                            <div class="action-btns">
                                <button class="edit-btn">Edit</button>
                                <button class="delete-btn">Delete</button>
                                <button class="history-btn">History</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>PAT002</td>
                        <td>Jean Martin</td>
                        <td>+33 1 98 76 54 32</td>
                        <td>jean.martin@email.com</td>
                        <td>Diabetes type 2. Monthly monitoring required.</td>
                        <td>
                            <div class="action-btns">
                                <button class="edit-btn">Edit</button>
                                <button class="delete-btn">Delete</button>
                                <button class="history-btn">History</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>PAT003</td>
                        <td>Sophie Bernard</td>
                        <td>+33 1 55 44 33 22</td>
                        <td>sophie.bernard@gmail.com</td>
                        <td>Chronic migraines. Avoid bright lights during consultations.</td>
                        <td>
                            <div class="action-btns">
                                <button class="edit-btn">Edit</button>
                                <button class="delete-btn">Delete</button>
                                <button class="history-btn">History</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>PAT004</td>
                        <td>Pierre Dubois</td>
                        <td>+33 1 77 88 99 00</td>
                        <td>p.dubois@hotmail.com</td>
                        <td>Hypertension. Family history of heart disease.</td>
                        <td>
                            <div class="action-btns">
                                <button class="edit-btn">Edit</button>
                                <button class="delete-btn">Delete</button>
                                <button class="history-btn">History</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>PAT005</td>
                        <td>Claire Moreau</td>
                        <td>+33 1 66 55 44 33</td>
                        <td>claire.moreau@yahoo.fr</td>
                        <td>Asthma patient. Always carries inhaler.</td>
                        <td>
                            <div class="action-btns">
                                <button class="edit-btn">Edit</button>
                                <button class="delete-btn">Delete</button>
                                <button class="history-btn">History</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>`;
}