export default function IsLoggedIn() {
    return (localStorage.getItem('token'));
}