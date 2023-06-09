import config from '$lib/config';

/**
 * @param {string} email
 * @param {string} password
 */
export default async function signIn(email, password) {
	const res = await fetch(`${config.apiUrl}/api/user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			password: password
		})
	});

	if (res.ok) {
		const data = await res.json();
		const authToken = data.token;
		localStorage.setItem('authToken', authToken); // Save the token to local storage
		return true; // Return true to indicate successful sign-in
	} else {
		throw new Error('Sign-in failed');
	}
}
