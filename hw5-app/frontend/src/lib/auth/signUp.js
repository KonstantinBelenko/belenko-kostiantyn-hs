import config from '$lib/config';

/**
 * @param {string} email
 * @param {string} password
 * @param {string} name
 */
export default async function signIn(email, password, name) {
	const res = await fetch(`${config.apiUrl}/api/user/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			name,
			password
		})
	});

	const data = await res.json();

	if (res.ok) {
		const authToken = data.token;
		localStorage.setItem('authToken', authToken); // Save the token to local storage
		return true; // Return true to indicate successful sign-in
	} else {
		console.log('signUp:', data);
		throw new Error(`Sign-up failed: ${data}`);
	}
}
