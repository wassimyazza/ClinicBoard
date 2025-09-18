


export function logout(){
    const currentAdmin = JSON.parse(localStorage.getItem('admin'));
    currentAdmin.auth = "desactive";
    localStorage.setItem('admin',JSON.stringify(currentAdmin));
    location.replace("#home");
}