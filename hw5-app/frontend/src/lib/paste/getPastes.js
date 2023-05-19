import config from '$lib/config';

/**
 * @description Fetches pastes from the backend.
 * @param {any} fetch
 * @param {number} page
 * @param {number} limit
 * @param {string} sortBy
 * @param {string} sortOrder
 */
export default async function getPastes(
	fetch,
	page = 1,
	limit = 10,
	sortBy = 'createdAt',
	sortOrder = 'desc'
) {
	const authToken = localStorage.getItem('authToken');

	if (!authToken) {
		console.error('getPastes: no auth token');
		return false;
	}

	try {
		const response = await fetch(
			`${config.apiUrl}/api/pastes?limit=${limit}&page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'auth-token': authToken
				}
			}
		);
		if (response.ok) {
			const data = await response.json();
			return data.pastes;
		} else {
			console.error('Failed to fetch pastes:', response.status, response.statusText);
			return [];
		}
	} catch (error) {
		console.error('Failed to fetch pastes:', error);
		return [];
	}
}
