export default function IsLoggedIn() {
    return (sessionStorage.getItem('Token'));
}