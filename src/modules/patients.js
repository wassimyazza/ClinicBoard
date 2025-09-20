export async function patientsRander(){
    const app = document.getElementById("result");
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    
    app.innerHTML = `<style>
.patients-page{background-color:#f9f9f9;min-height:100vh;font-family:Arial,sans-serif}
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
.search-section{background-color:white;padding:20px;margin-bottom:25px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1)}
.search-box{width:100%;max-width:400px;padding:12px 15px;border:2px solid #ddd;border-radius:5px;font-size:16px}
.search-box:focus{border-color:#3498db;outline:none}
.patients-table{background-color:white;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);overflow:hidden}
.table{width:100%;border-collapse:collapse}
.table th{background-color:#34495e;color:white;padding:15px;text-align:left;font-weight:bold}
.table td{padding:15px;border-bottom:1px solid #eee}
.table tr:hover{background-color:#f8f9fa}
.action-btns{display:flex;gap:8px}
.edit-btn{background-color:#3498db;color:white;padding:6px 12px;border:none;border-radius:4px;cursor:pointer;font-size:12px}
.edit-btn:hover{background-color:#2980b9}
.delete-btn{background-color:#e74c3c;color:white;padding:6px 12px;border:none;border-radius:4px;cursor:pointer;font-size:12px}
.delete-btn:hover{background-color:#c0392b}
.history-btn{background-color:#f39c12;color:white;padding:6px 12px;border:none;border-radius:4px;cursor:pointer;font-size:12px}
.history-btn:hover{background-color:#e67e22}
@media (max-width:768px){.content{padding:15px}.page-header{flex-direction:column;gap:15px;text-align:center}.table{font-size:14px}.table th,.table td{padding:10px 8px}}
.popup-overlay{position:fixed;background:rgba(44,62,80,0.9);backdrop-filter:blur(8px);top:0;left:0;width:100%;height:100%;justify-content:center;align-items:center;z-index:999;display:none}
.patient-form{background:white;width:90%;max-width:450px;box-shadow:0 20px 60px rgba(0,0,0,0.15);border-radius:15px;padding:40px 30px;position:relative;animation:slideUp 0.3s ease}
@keyframes slideUp{from{opacity:0;transform:translateY(50px)}to{opacity:1;transform:translateY(0)}}
.patient-form h1{color:#2c3e50;font-size:28px;font-weight:600;margin:0 0 30px 0;text-align:center;position:relative}
.patient-form h1::after{content:'';position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);width:60px;height:3px;background:linear-gradient(90deg,#3498db,#27ae60);border-radius:2px}
.form-group{margin-bottom:20px;position:relative}
.form-group label{display:block;color:#34495e;font-weight:500;margin-bottom:8px;font-size:14px}
.form-group input,.form-group textarea{width:100%;padding:15px 20px;border:2px solid #e8ecf0;border-radius:10px;font-size:16px;font-family:Arial,sans-serif;transition:all 0.3s ease;background:#fff;box-sizing:border-box}
.form-group input:focus,.form-group textarea:focus{outline:none;border-color:#3498db;box-shadow:0 0 0 3px rgba(52,152,219,0.1);transform:translateY(-2px)}
.form-group textarea{min-height:80px;resize:vertical}
.form-actions{display:flex;gap:15px;margin-top:30px}
.form-actions button{flex:1;padding:15px;border:none;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;transition:all 0.3s ease;text-transform:uppercase;letter-spacing:0.5px}
.btn-primary{background:linear-gradient(135deg,#27ae60,#2ecc71);color:white}
.btn-primary:hover{background:linear-gradient(135deg,#229954,#27ae60);transform:translateY(-2px);box-shadow:0 8px 25px rgba(39,174,96,0.3)}
.btn-edit{background:linear-gradient(135deg,#3498db,#5dade2);color:white}
.btn-edit:hover{background:linear-gradient(135deg,#2980b9,#3498db);transform:translateY(-2px);box-shadow:0 8px 25px rgba(52,152,219,0.3)}
.btn-secondary{background:#95a5a6;color:white}
.btn-secondary:hover{background:#7f8c8d;transform:translateY(-2px);box-shadow:0 8px 25px rgba(149,165,166,0.3)}
</style>

<div class="patients-page">
    <div id="add-patient-popup" class="popup-overlay">
        <form id="add-patient-form" class="patient-form">
            <h1>Add New Patient</h1>
            <div class="form-group">
                <label for="add-fullName">Full Name</label>
                <input type="text" id="add-fullName" placeholder="Enter patient's full name" required>
            </div>
            <div class="form-group">
                <label for="add-phone">Phone Number</label>
                <input type="tel" id="add-phone" placeholder="Enter phone number" required>
            </div>
            <div class="form-group">
                <label for="add-email">Email Address</label>
                <input type="email" id="add-email" placeholder="Enter email address" required>
            </div>
            <div class="form-group">
                <label for="add-notes">Medical Notes</label>
                <textarea id="add-notes" placeholder="Add any medical notes or allergies..."></textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-primary">Add Patient</button>
                <button type="button" id="close-add-popup" class="btn-secondary">Cancel</button>
            </div>
        </form>
    </div>

    <div id="edit-patient-popup" class="popup-overlay">
        <form id="edit-patient-form" class="patient-form">
            <h1>Edit Patient</h1>
            <div class="form-group">
                <label for="edit-fullName">Full Name</label>
                <input type="text" id="edit-fullName" placeholder="Enter patient's full name" required>
            </div>
            <div class="form-group">
                <label for="edit-phone">Phone Number</label>
                <input type="tel" id="edit-phone" placeholder="Enter phone number" required>
            </div>
            <div class="form-group">
                <label for="edit-email">Email Address</label>
                <input type="email" id="edit-email" placeholder="Enter email address" required>
            </div>
            <div class="form-group">
                <label for="edit-notes">Medical Notes</label>
                <textarea id="edit-notes" placeholder="Add any medical notes or allergies..."></textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-edit">Update Patient</button>
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
                <tbody id="patients-tbody">
                    
                </tbody>
            </table>
        </div>
    </div>
</div>`;

    displayPatients(patients);
    setupEventListeners();
}

function setupEventListeners() {
    const addBtn = document.querySelector('.add-btn');
    const addPopup = document.getElementById('add-patient-popup');
    const editPopup = document.getElementById('edit-patient-popup');
    const closeAddBtn = document.getElementById('close-add-popup');
    const closeEditBtn = document.getElementById('close-edit-popup');
    const addForm = document.getElementById('add-patient-form');
    const editForm = document.getElementById('edit-patient-form');
    const searchBox = document.querySelector('.search-box');

    addBtn.addEventListener('click', () => {
        addPopup.style.display = 'flex';
        addForm.reset();
    });

    closeAddBtn.addEventListener('click', () => {
        addPopup.style.display = 'none';
    });

    closeEditBtn.addEventListener('click', () => {
        editPopup.style.display = 'none';
    });

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addPatient();
    });

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updatePatient();
    });

    searchBox.addEventListener('keyup', function() {
        const searchValue = this.value.toLowerCase();
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        
        if (searchValue === '') {
            displayPatients(patients);
        } else {
            const filteredPatients = patients.filter(patient => 
                patient.fullName.toLowerCase().includes(searchValue) ||
                patient.phone.includes(searchValue)
            );
            displayPatients(filteredPatients);
        }
    });

    const tbody = document.getElementById('patients-tbody');
    tbody.addEventListener('click', (e) => {
        const patientId = e.target.dataset.patientId;
        
        if (e.target.classList.contains('edit-btn')) {
            editPatient(patientId);
        } else if (e.target.classList.contains('delete-btn')) {
            deletePatient(patientId);
        }
    });
}

function addPatient() {
    const fullName = document.getElementById('add-fullName').value.trim();
    const phone = document.getElementById('add-phone').value.trim();
    const email = document.getElementById('add-email').value.trim();
    const notes = document.getElementById('add-notes').value.trim();

    if (!fullName || !phone || !email) {
        alert('Please fill in all required fields');
        return;
    }

    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const newId = generatePatientId(patients);
    const now = new Date().toISOString();

    const newPatient = {
        id: newId,
        fullName: fullName,
        phone: phone,
        email: email,
        notes: notes,
        createdAt: now,
        updatedAt: now
    };

    patients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(patients));
    displayPatients(patients);
    
    document.getElementById('add-patient-popup').style.display = 'none';
    alert('Patient added successfully!');
}

function editPatient(patientId) {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const patient = patients.find(p => p.id === patientId);
    
    if (!patient) {
        alert('Patient not found!');
        return;
    }

    document.getElementById('edit-fullName').value = patient.fullName;
    document.getElementById('edit-phone').value = patient.phone;
    document.getElementById('edit-email').value = patient.email;
    document.getElementById('edit-notes').value = patient.notes;

    document.getElementById('edit-patient-form').dataset.patientId = patientId;
    document.getElementById('edit-patient-popup').style.display = 'flex';
}

function updatePatient() {
    const form = document.getElementById('edit-patient-form');
    const patientId = form.dataset.patientId;
    
    const fullName = document.getElementById('edit-fullName').value.trim();
    const phone = document.getElementById('edit-phone').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const notes = document.getElementById('edit-notes').value.trim();

    if (!fullName || !phone || !email) {
        alert('Please fill in all required fields');
        return;
    }

    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const patientIndex = patients.findIndex(p => p.id === patientId);

    if (patientIndex === -1) {
        alert('Patient not found!');
        return;
    }

    patients[patientIndex] = {
        ...patients[patientIndex],
        fullName: fullName,
        phone: phone,
        email: email,
        notes: notes,
        updatedAt: new Date().toISOString()
    };

    localStorage.setItem('patients', JSON.stringify(patients));
    displayPatients(patients);
    
    document.getElementById('edit-patient-popup').style.display = 'none';
    alert('Patient updated successfully!');
}

function deletePatient(patientId) {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const updatedPatients = patients.filter(patient => patient.id !== patientId);
    
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    displayPatients(updatedPatients);
}

function displayPatients(patients) {
    const tbody = document.getElementById('patients-tbody');
    
    if (patients.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#666;">No patients found</td></tr>';
        return;
    }

    const html = patients.map(patient => `
        <tr>
            <td>${patient.id}</td>
            <td>${patient.fullName}</td>
            <td>${patient.phone}</td>
            <td>${patient.email}</td>
            <td>${patient.notes || '-'}</td>
            <td>
                <div class="action-btns">
                    <button class="edit-btn" data-patient-id="${patient.id}">Edit</button>
                    <button class="delete-btn" data-patient-id="${patient.id}">Delete</button>
                    <button class="history-btn">History</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    tbody.innerHTML = html;
}

function generatePatientId(patients) {
    if (patients.length === 0) {
        return 'PAT001';
    }
    
    const lastPatient = patients[patients.length - 1];
    const lastIdNumber = parseInt(lastPatient.id.replace('PAT', ''));
    const newIdNumber = lastIdNumber + 1;
    
    return `PAT${newIdNumber.toString().padStart(3, '0')}`;
}