export default function signOut() {
	localStorage.removeItem('authToken'); // Remove the authentication token from local storage
}
