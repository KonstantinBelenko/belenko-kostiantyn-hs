import config from '$lib/config';

/**
 * @param {any} fetch
 */
export default async function isAuthed(fetch) {
	const authToken = localStorage.getItem('authToken');

	if (!authToken) {
		console.log('isAuthed: no auth token');
		return false;
	}

	const res = await fetch(`${config.apiUrl}/api/private/validate`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'auth-token': authToken // Pass the 'auth-token' header with the auth token
		}
	});

	console.log('isAuthed:', res.status);

	return res.status === 200;
}
