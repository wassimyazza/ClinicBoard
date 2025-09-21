export function appointmentsRander(){
    const app = document.getElementById("result");
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    
    app.innerHTML = `<style>
.appointments-page{background-color:#f9f9f9;min-height:100vh;font-family:Arial,sans-serif}
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
.appointments-table{background-color:white;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);overflow:hidden}
.table{width:100%;border-collapse:collapse}
.table th{background-color:#34495e;color:white;padding:15px;text-align:left;font-weight:bold}
.table td{padding:15px;border-bottom:1px solid #eee}
.table tr:hover{background-color:#f8f9fa}
.action-btns{display:flex;gap:8px}
.edit-btn{background-color:#3498db;color:white;padding:6px 12px;border:none;border-radius:4px;cursor:pointer;font-size:12px}
.edit-btn:hover{background-color:#2980b9}
.delete-btn{background-color:#e74c3c;color:white;padding:6px 12px;border:none;border-radius:4px;cursor:pointer;font-size:12px}
.delete-btn:hover{background-color:#c0392b}
.status-scheduled{background:#27ae60;color:white;padding:4px 8px;border-radius:12px;font-size:11px;font-weight:bold}
.status-completed{background:#95a5a6;color:white;padding:4px 8px;border-radius:12px;font-size:11px;font-weight:bold}
.status-cancelled{background:#e74c3c;color:white;padding:4px 8px;border-radius:12px;font-size:11px;font-weight:bold}
.status-noshow{background:#f39c12;color:white;padding:4px 8px;border-radius:12px;font-size:11px;font-weight:bold}
@media (max-width:768px){.content{padding:15px}.page-header{flex-direction:column;gap:15px;text-align:center}.table{font-size:14px}.table th,.table td{padding:10px 8px}}
.popup-overlay{position:fixed;background:rgba(44,62,80,0.9);backdrop-filter:blur(8px);top:0;left:0;width:100%;height:100%;justify-content:center;align-items:center;z-index:999;display:none}
.appointment-form{background:white;width:90%;max-width:450px;box-shadow:0 20px 60px rgba(0,0,0,0.15);border-radius:15px;padding:40px 30px;position:relative;animation:slideUp 0.3s ease}
@keyframes slideUp{from{opacity:0;transform:translateY(50px)}to{opacity:1;transform:translateY(0)}}
.appointment-form h1{color:#2c3e50;font-size:28px;font-weight:600;margin:0 0 30px 0;text-align:center;position:relative}
.appointment-form h1::after{content:'';position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);width:60px;height:3px;background:linear-gradient(90deg,#3498db,#27ae60);border-radius:2px}
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

<div class="appointments-page">
    <div id="add-appointment-popup" class="popup-overlay">
        <form id="add-appointment-form" class="appointment-form">
            <h1>New Appointment</h1>
            <div class="form-group">
                <label for="add-patient">Patient</label>
                <select id="add-patient" required>
                    <option value="">Select Patient</option>
                    ${patients.map(p => `<option value="${p.id}">${p.fullName}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label for="add-date">Date</label>
                <input type="date" id="add-date" required>
            </div>
            <div class="form-group">
                <label for="add-time">Time</label>
                <input type="time" id="add-time" required>
            </div>
            <div class="form-group">
                <label for="add-practitioner">Practitioner</label>
                <select id="add-practitioner" required>
                    <option value="">Select Practitioner</option>
                    <option value="Dr. Martin">Dr. Martin</option>
                    <option value="Dr. Dupont">Dr. Dupont</option>
                    <option value="Dr. Bernard">Dr. Bernard</option>
                </select>
            </div>
            <div class="form-group">
                <label for="add-type">Type</label>
                <select id="add-type" required>
                    <option value="">Select Type</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Emergency">Emergency</option>
                </select>
            </div>
            <div class="form-group">
                <label for="add-duration">Duration</label>
                <select id="add-duration" required>
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">60 min</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-primary">Create</button>
                <button type="button" id="close-add-popup" class="btn-secondary">Cancel</button>
            </div>
        </form>
    </div>

    <div id="edit-appointment-popup" class="popup-overlay">
        <form id="edit-appointment-form" class="appointment-form">
            <h1>Edit Appointment</h1>
            <div class="form-group">
                <label for="edit-patient">Patient</label>
                <select id="edit-patient" required>
                    <option value="">Select Patient</option>
                    ${patients.map(p => `<option value="${p.id}">${p.fullName}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label for="edit-date">Date</label>
                <input type="date" id="edit-date" required>
            </div>
            <div class="form-group">
                <label for="edit-time">Time</label>
                <input type="time" id="edit-time" required>
            </div>
            <div class="form-group">
                <label for="edit-practitioner">Practitioner</label>
                <select id="edit-practitioner" required>
                    <option value="">Select Practitioner</option>
                    <option value="Dr. Martin">Dr. Martin</option>
                    <option value="Dr. Dupont">Dr. Dupont</option>
                    <option value="Dr. Bernard">Dr. Bernard</option>
                </select>
            </div>
            <div class="form-group">
                <label for="edit-type">Type</label>
                <select id="edit-type" required>
                    <option value="">Select Type</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Emergency">Emergency</option>
                </select>
            </div>
            <div class="form-group">
                <label for="edit-duration">Duration</label>
                <select id="edit-duration" required>
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">60 min</option>
                </select>
            </div>
            <div class="form-group">
                <label for="edit-status">Status</label>
                <select id="edit-status" required>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="noshow">No Show</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-edit">Update</button>
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
                <a href="#appointments" class="nav-link active">Appointments</a>
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
            <h1 class="page-title">Appointments Management</h1>
            <button class="add-btn">New Appointment</button>
        </div>

        <div class="search-section">
            <input 
                type="text" 
                class="search-box" 
                placeholder="Search appointments by patient name..."
            >
        </div>

        <div class="appointments-table">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Practitioner</th>
                        <th>Type</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="appointments-tbody">
                    
                </tbody>
            </table>
        </div>
    </div>
</div>`;

    displayAppointments(appointments);
    setupEventListeners();
}

function setupEventListeners() {
    const addBtn = document.querySelector('.add-btn');
    const addPopup = document.getElementById('add-appointment-popup');
    const editPopup = document.getElementById('edit-appointment-popup');
    const closeAddBtn = document.getElementById('close-add-popup');
    const closeEditBtn = document.getElementById('close-edit-popup');
    const addForm = document.getElementById('add-appointment-form');
    const editForm = document.getElementById('edit-appointment-form');
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
        addAppointment();
    });

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updateAppointment();
    });

    searchBox.addEventListener('keyup', function() {
        const searchValue = this.value.toLowerCase();
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        
        if (searchValue === '') {
            displayAppointments(appointments);
        } else {
            const patients = JSON.parse(localStorage.getItem('patients')) || [];
            const filteredAppointments = appointments.filter(appointment => {
                const patient = patients.find(p => p.id === appointment.patientId);
                const patientName = patient ? patient.fullName.toLowerCase() : '';
                return patientName.includes(searchValue);
            });
            displayAppointments(filteredAppointments);
        }
    });

    const tbody = document.getElementById('appointments-tbody');
    tbody.addEventListener('click', (e) => {
        const appointmentId = e.target.dataset.appointmentId;
        
        if (e.target.classList.contains('edit-btn')) {
            editAppointment(appointmentId);
        } else if (e.target.classList.contains('delete-btn')) {
            deleteAppointment(appointmentId);
        }
    });
}

function addAppointment() {
    const patientId = document.getElementById('add-patient').value;
    const date = document.getElementById('add-date').value;
    const time = document.getElementById('add-time').value;
    const practitioner = document.getElementById('add-practitioner').value;
    const type = document.getElementById('add-type').value;
    const duration = document.getElementById('add-duration').value;

    if (!patientId || !date || !time || !practitioner || !type) {
        alert('Please fill in all required fields');
        return;
    }

    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    let newId = 1;
    if (appointments.length > 0) {
        const lastAppointment = appointments[appointments.length - 1];
        const lastIdNumber = lastAppointment.id.replace('APT', '');
        newId = parseInt(lastIdNumber) + 1;
    }

    const newAppointment = {
        id: 'APT' + newId,
        patientId: patientId,
        date: date,
        time: time,
        practitioner: practitioner,
        type: type,
        duration: duration,
        status: 'scheduled',
        createdAt: new Date().toISOString()
    };

    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    displayAppointments(appointments);
    
    document.getElementById('add-appointment-popup').style.display = 'none';
    alert('Appointment created successfully!');
}

function editAppointment(appointmentId) {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    let appointment = null;
    
    for (let i = 0; i < appointments.length; i++) {
        if (appointments[i].id === appointmentId) {
            appointment = appointments[i];
            break;
        }
    }
    
    if (!appointment) {
        alert('Appointment not found!');
        return;
    }

    document.getElementById('edit-patient').value = appointment.patientId;
    document.getElementById('edit-date').value = appointment.date;
    document.getElementById('edit-time').value = appointment.time;
    document.getElementById('edit-practitioner').value = appointment.practitioner;
    document.getElementById('edit-type').value = appointment.type;
    document.getElementById('edit-duration').value = appointment.duration;
    document.getElementById('edit-status').value = appointment.status;

    document.getElementById('edit-appointment-form').dataset.appointmentId = appointmentId;
    document.getElementById('edit-appointment-popup').style.display = 'flex';
}

function updateAppointment() {
    const form = document.getElementById('edit-appointment-form');
    const appointmentId = form.dataset.appointmentId;
    
    const patientId = document.getElementById('edit-patient').value;
    const date = document.getElementById('edit-date').value;
    const time = document.getElementById('edit-time').value;
    const practitioner = document.getElementById('edit-practitioner').value;
    const type = document.getElementById('edit-type').value;
    const duration = document.getElementById('edit-duration').value;
    const status = document.getElementById('edit-status').value;

    if (!patientId || !date || !time || !practitioner || !type) {
        alert('Please fill in all required fields');
        return;
    }

    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    
    for (let i = 0; i < appointments.length; i++) {
        if (appointments[i].id === appointmentId) {
            appointments[i].patientId = patientId;
            appointments[i].date = date;
            appointments[i].time = time;
            appointments[i].practitioner = practitioner;
            appointments[i].type = type;
            appointments[i].duration = duration;
            appointments[i].status = status;
            break;
        }
    }

    localStorage.setItem('appointments', JSON.stringify(appointments));
    displayAppointments(appointments);
    
    document.getElementById('edit-appointment-popup').style.display = 'none';
    alert('Appointment updated successfully!');
}

function deleteAppointment(appointmentId) {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const updatedAppointments = appointments.filter(appointment => appointment.id !== appointmentId);
    
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    displayAppointments(updatedAppointments);
}

function displayAppointments(appointments) {
    const tbody = document.getElementById('appointments-tbody');
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    
    if (appointments.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;color:#666;">No appointments found</td></tr>';
        return;
    }

    let html = '';
    appointments.forEach(appointment => {
        const patient = patients.find(p => p.id === appointment.patientId);
        const patientName = patient ? patient.fullName : 'Unknown Patient';
        
        html += `<tr>
            <td>${appointment.id}</td>
            <td>${patientName}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td>${appointment.practitioner}</td>
            <td>${appointment.type}</td>
            <td>${appointment.duration} min</td>
            <td><span class="status-${appointment.status}">${appointment.status.toUpperCase()}</span></td>
            <td>
                <div class="action-btns">
                    <button class="edit-btn" data-appointment-id="${appointment.id}">Edit</button>
                    <button class="delete-btn" data-appointment-id="${appointment.id}">Delete</button>
                </div>
            </td>
        </tr>`;
    });
    
    tbody.innerHTML = html;
}