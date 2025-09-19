export function patientsRander(){
    if(!checkAuth()) return location.replace("#home");
    
    const app = document.getElementById("result");
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    
    app.innerHTML = `<style>
.patients-page{background:#f9f9f9;min-height:100vh;font-family:Arial,sans-serif}.nav-menu{background:white;padding:0;margin:0;box-shadow:0 2px 4px rgba(0,0,0,0.1)}.nav-list{display:flex;list-style:none;margin:0;padding:0}.nav-item{flex:1;text-align:center}.nav-link{display:block;padding:20px 15px;color:#666;text-decoration:none;border-bottom:3px solid transparent;transition:all 0.2s;font-weight:500}.nav-link:hover{background:#f8f9fa;color:#333}.nav-link.active{color:#3498db;border-bottom-color:#3498db;background:#f8f9fa}.content{padding:25px}.page-header{background:white;padding:25px;margin-bottom:25px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);display:flex;justify-content:space-between;align-items:center}.page-title{margin:0;color:#2c3e50;font-size:26px}.add-btn{background:#27ae60;color:white;padding:12px 20px;border:none;border-radius:5px;cursor:pointer;font-weight:bold;font-size:14px}.add-btn:hover{background:#229954}.search-section{background:white;padding:20px;margin-bottom:25px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1)}.search-box{width:100%;max-width:400px;padding:12px 15px;border:2px solid #ddd;border-radius:5px;font-size:16px}.search-box:focus{border-color:#3498db;outline:none}.patients-table{background:white;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);overflow:hidden}.table{width:100%;border-collapse:collapse}.table th{background:#34495e;color:white;padding:15px;text-align:left;font-weight:bold}.table td{padding:15px;border-bottom:1px solid #eee}.table tr:hover{background:#f8f9fa}.action-btns{display:flex;gap:8px}.edit-btn{background:#3498db;color:white;padding:6px 12px;border:none;border-radius:4px;cursor:pointer;font-size:12px}.edit-btn:hover{background:#2980b9}.delete-btn{background:#e74c3c;color:white;padding:6px 12px;border:none;border-radius:4px;cursor:pointer;font-size:12px}.delete-btn:hover{background:#c0392b}.history-btn{background:#f39c12;color:white;padding:6px 12px;border:none;border-radius:4px;cursor:pointer;font-size:12px}.history-btn:hover{background:#e67e22}.popup-overlay{position:fixed;background:rgba(44,62,80,0.9);top:0;left:0;width:100%;height:100%;display:none;justify-content:center;align-items:center;z-index:999}.patient-form{background:white;width:90%;max-width:450px;box-shadow:0 20px 60px rgba(0,0,0,0.15);border-radius:15px;padding:40px 30px}.patient-form h1{color:#2c3e50;font-size:28px;font-weight:600;margin:0 0 30px 0;text-align:center}.form-group{margin-bottom:20px}.form-group label{display:block;color:#34495e;font-weight:500;margin-bottom:8px;font-size:14px}.form-group input,.form-group textarea{width:100%;padding:15px 20px;border:2px solid #e8ecf0;border-radius:10px;font-size:16px;box-sizing:border-box}.form-group input:focus,.form-group textarea:focus{outline:none;border-color:#3498db}.form-group textarea{min-height:80px;resize:vertical}.form-actions{display:flex;gap:15px;margin-top:30px}.form-actions button{flex:1;padding:15px;border:none;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;text-transform:uppercase}.btn-primary{background:#27ae60;color:white}.btn-primary:hover{background:#229954}.btn-edit{background:#3498db;color:white}.btn-edit:hover{background:#2980b9}.btn-secondary{background:#95a5a6;color:white}.btn-secondary:hover{background:#7f8c8d}@media (max-width:768px){.content{padding:15px}.page-header{flex-direction:column;gap:15px;text-align:center}.table{font-size:14px}.table th,.table td{padding:10px 8px}}
</style>

<div class="patients-page">
    <div id="add-popup" class="popup-overlay">
        <form id="add-form" class="patient-form">
            <h1>Add Patient</h1>
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="add-name" required>
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" id="add-phone" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="add-email" required>
            </div>
            <div class="form-group">
                <label>Notes</label>
                <textarea id="add-notes"></textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-primary">Add</button>
                <button type="button" id="close-add" class="btn-secondary">Cancel</button>
            </div>
        </form>
    </div>

    <div id="edit-popup" class="popup-overlay">
        <form id="edit-form" class="patient-form">
            <h1>Edit Patient</h1>
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="edit-name" required>
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" id="edit-phone" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="edit-email" required>
            </div>
            <div class="form-group">
                <label>Notes</label>
                <textarea id="edit-notes"></textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-edit">Update</button>
                <button type="button" id="close-edit" class="btn-secondary">Cancel</button>
            </div>
        </form>
    </div>

    <nav class="nav-menu">
        <ul class="nav-list">
            <li class="nav-item"><a href="#dashboard" class="nav-link">Dashboard</a></li>
            <li class="nav-item"><a href="#patients" class="nav-link active">Patients</a></li>
            <li class="nav-item"><a href="#appointments" class="nav-link">Appointments</a></li>
            <li class="nav-item"><a href="#revenue" class="nav-link">Revenue</a></li>
            <li class="nav-item"><a href="#expenses" class="nav-link">Expenses</a></li>
        </ul>
    </nav>

    <div class="content">
        <div class="page-header">
            <h1 class="page-title">Patients Management</h1>
            <button class="add-btn">Add New Patient</button>
        </div>

        <div class="search-section">
            <input type="text" class="search-box" placeholder="Search patients by name or phone...">
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
                <tbody id="tbody">
                    
                </tbody>
            </table>
        </div>
    </div>
</div>`;

    displayPatients(patients);
    setupEvents();
}

function setupEvents() {
    const addBtn = document.querySelector('.add-btn');
    const searchBox = document.querySelector('.search-box');
    const addPopup = document.getElementById('add-popup');
    const editPopup = document.getElementById('edit-popup');
    const addForm = document.getElementById('add-form');
    const editForm = document.getElementById('edit-form');

    addBtn.onclick = () => {
        addPopup.style.display = 'flex';
        addForm.reset();
    };

    document.getElementById('close-add').onclick = () => addPopup.style.display = 'none';
    document.getElementById('close-edit').onclick = () => editPopup.style.display = 'none';

    addForm.onsubmit = (e) => {
        e.preventDefault();
        addPatient();
    };

    editForm.onsubmit = (e) => {
        e.preventDefault();
        updatePatient();
    };

    searchBox.onkeyup = function() {
        const value = this.value.toLowerCase();
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        let filtered;
        if (value === '') {
            filtered = patients;
        } else {
            filtered = [];
            
            for (let i = 0; i < patients.length; i++) {
                let patient = patients[i];
                
                if (patient.fullName.toLowerCase().includes(value.toLowerCase()) || patient.phone.includes(value)) {
                    filtered.push(patient);
                }
            }
        }

        displayPatients(filtered);
    };

    document.getElementById('tbody').onclick = function(e) {
        var id = e.target.dataset.patientId;

        if (e.target.classList.contains('edit-btn')) {
            editPatient(id);
        }
        if (e.target.classList.contains('delete-btn')) {
            deletePatient(id);
        }
    };

}

function addPatient() {
    const name = document.getElementById('add-name').value.trim();
    const phone = document.getElementById('add-phone').value.trim();
    const email = document.getElementById('add-email').value.trim();
    const notes = document.getElementById('add-notes').value.trim();

    if (!name || !phone || !email) return alert('Please fill required fields');

    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const id = patients.length === 0 ? 'PAT001' : 'PAT' + (parseInt(patients[patients.length - 1].id.replace('PAT', '')) + 1).toString().padStart(3, '0');
    const now = new Date().toISOString();

    patients.push({id, fullName: name, phone, email, notes, createdAt: now, updatedAt: now});
    localStorage.setItem('patients', JSON.stringify(patients));
    displayPatients(patients);
    document.getElementById('add-popup').style.display = 'none';
    alert('Patient added successfully!');
}

function editPatient(patientId) {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const patient = patients.find(p => p.id === patientId);
    
    if (!patient) return alert('Patient not found!');

    document.getElementById('edit-name').value = patient.fullName;
    document.getElementById('edit-phone').value = patient.phone;
    document.getElementById('edit-email').value = patient.email;
    document.getElementById('edit-notes').value = patient.notes;
    document.getElementById('edit-form').dataset.patientId = patientId;
    document.getElementById('edit-popup').style.display = 'flex';
}

function updatePatient() {
    const form = document.getElementById('edit-form');
    const patientId = form.dataset.patientId;
    const name = document.getElementById('edit-name').value.trim();
    const phone = document.getElementById('edit-phone').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const notes = document.getElementById('edit-notes').value.trim();

    if (!name || !phone || !email) return alert('Please fill required fields');

    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const index = patients.findIndex(p => p.id === patientId);
    
    if (index === -1) return alert('Patient not found!');

    patients[index].fullName = name;
    patients[index].phone = phone;
    patients[index].email = email;
    patients[index].notes = notes;
    patients[index].updatedAt = new Date().toISOString();

    localStorage.setItem('patients', JSON.stringify(patients));
    displayPatients(patients);
    document.getElementById('edit-popup').style.display = 'none';
    alert('Patient updated successfully!');
}

function deletePatient(patientId) {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const updated = patients.filter(p => p.id !== patientId);
    localStorage.setItem('patients', JSON.stringify(updated));
    displayPatients(updated);
}

function displayPatients(patients) {
    const tbody = document.getElementById('tbody');
    
    if (patients.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#666;">No patients found</td></tr>';
        return;
    }

    let html = '';

    for (let i = 0; i < patients.length; i++) {
        const p = patients[i];
        html += `
            <tr>
                <td>${p.id}</td>
                <td>${p.fullName}</td>
                <td>${p.phone}</td>
                <td>${p.email}</td>
                <td>${p.notes || '-'}</td>
                <td>
                    <div class="action-btns">
                        <button class="edit-btn" data-patient-id="${p.id}">Edit</button>
                        <button class="delete-btn" data-patient-id="${p.id}">Delete</button>
                        <button class="history-btn">History</button>
                    </div>
                </td>
            </tr>
        `;
    }

    tbody.innerHTML = html;
}

function checkAuth() {
    const admin = JSON.parse(localStorage.getItem("admin"));
    return admin && admin.auth === "active";
}