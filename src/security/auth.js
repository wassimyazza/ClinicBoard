export function authRander(){
    const app = document.getElementById('result');
    app.innerHTML = `<style>
    .login-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 20px;
        background-color: #f3f4f6;
    }

    .login-card {
        width: 100%;
        max-width: 400px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        padding: 40px;
    }

    .login-logo {
        text-align: center;
        margin-bottom: 40px;
    }

    .login-logo h1 {
        font-size: 36px;
        font-weight: bold;
        color: #374151;
        margin: 0;
    }

    .login-logo-blue {
        color: #3b82f6;
    }

    .form-group {
        position: relative;
        margin-bottom: 24px;
    }

    .input-field {
        width: 100%;
        padding: 16px 16px 16px 48px;
        background-color: #f9fafb;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        color: #374151;
        outline: none;
        box-sizing: border-box;
    }

    .input-field::placeholder {
        color: #9ca3af;
    }

    .input-field:focus {
        background-color: #ffffff;
        box-shadow: 0 0 0 2px #3b82f6;
    }

    .input-icon {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        color: #9ca3af;
    }

    .login-button {
        width: 100%;
        padding: 16px;
        background-color: #3b82f6;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .login-button:hover {
        background-color: #2563eb;
    }
    </style>

    <div class="login-container">
        <div class="login-card">
            <div class="login-logo">
                <h1>Clinic<span class="login-logo-blue">Board</span></h1>
            </div>

            <form id="loginForm">
                <div class="form-group">
                    <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <input name="email" type="email" placeholder="Email" class="input-field">
                </div>

                <div class="form-group">
                    <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    <input name="password" type="password" placeholder="Password" class="input-field">
                </div>

                <button type="submit" id="loginButton" class="login-button">Login</button>
            </form>
        </div>
    </div>`;

    const formLogin = document.getElementById('loginForm');
    formLogin.addEventListener('submit',(e)=>{
        e.preventDefault();
        const formElements = formLogin.elements;
        const errors = InformationsValidation(formElements[0].value,formElements[1].value);
        formElements[0].style.border = "none";
        formElements[1].style.border = "none";
        if(errors.length > 0){
            for(let i = 0; i < errors.length; i++){
                if(errors[i].message === "email"){
                    formElements[0].style.border = "2px solid red";
                }else if(errors[i].message === "password"){
                    formElements[1].style.border = "2px solid red";
                }
            }
        }else{
            let userInformations = {"email":formElements[0].value,"password":formElements[1].value,auth:"active"};
            if(saveUser(userInformations) === true){
                location.replace("#home");
            }else{
                if(ValidateLogin(formElements[0].value,formElements[1].value)){
                    location.replace('#home');
                }else{
                    alert('Invalid Informations');
                }
            }
            
        }
    })

    function InformationsValidation(email, password){
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const errors = [];

        if(!emailRegex.test(email)){
            errors.push({"message":"email"});
        }
        if(!passwordRegex.test(password)){
            errors.push({"message":"password"});
        }
        
        return errors;
    }
    function saveUser(user){
        if(!localStorage.getItem('admin')){
            localStorage.setItem('admin',JSON.stringify(user));
            return true;
        }

        return false;
    }
    function ValidateLogin(email, password){
        const savedUser = JSON.parse(localStorage.getItem('admin'));
        if(savedUser.email == email && savedUser.password == password){
            savedUser.auth = "active";
            return true;
        }
        return false;
        
    }
}

