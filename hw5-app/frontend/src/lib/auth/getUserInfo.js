import config from '$lib/config';

/**
 * @param {any} fetch
 * @description Checks if the user is authenticated, and returns their user data if they are. User data includes their name and email.
 */
export default async function getUserInfo(fetch) {
	const authToken = localStorage.getItem('authToken');

	if (!authToken) {
		throw new Error('No auth token');
	}

	const res = await fetch(`${config.apiUrl}/api/private/info`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'auth-token': authToken // Pass the 'auth-token' header with the auth token
		}
	});

	const userData = await res.json();

	return userData;
}
