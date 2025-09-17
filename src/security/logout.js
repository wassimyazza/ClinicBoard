


export function logout(){
    const currentAdmin = JSON.parse(localStorage.getItem('admin'));
    currentAdmin.auth = "disactive";
    location.replace("#home");
}