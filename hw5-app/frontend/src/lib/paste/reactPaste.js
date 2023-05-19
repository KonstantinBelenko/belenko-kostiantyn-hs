import config from '$lib/config';

/**
 * @param {string} id
 */
export async function likePaste(id) {
	const authToken = localStorage.getItem('authToken');

	if (!authToken) {
		console.error('dislikePaste: no auth token');
		return false;
	}

	try {
		const response = await fetch(`${config.apiUrl}/api/pastes/${id}/like`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': authToken
			}
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			console.error('Failed to like paste:', response.status, response.statusText);
			alert('Failed to like paste. Please try again.');
		}
	} catch (error) {
		console.error('Failed to like paste:', error);
		alert('Failed to like paste. Please try again.');
	}
}

/**
 * @param {string} id
 */
export async function dislikePaste(id) {
	const authToken = localStorage.getItem('authToken');

	if (!authToken) {
		console.error('dislikePaste: no auth token');
		return false;
	}

	try {
		const response = await fetch(`${config.apiUrl}/api/pastes/${id}/dislike`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': authToken
			}
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			console.error('Failed to dislike paste:', response.status, response.statusText);
			alert('Failed to dislike paste. Please try again.');
		}
	} catch (error) {
		console.error('Failed to dislike paste:', error);
		alert('Failed to dislike paste. Please try again.');
	}
}
