import { redirect } from '@sveltejs/kit';
import config from '$lib/config';

/**
 * @param {string} content
 */
export default async function createPaste(content) {
	const authToken = localStorage.getItem('authToken');

	if (!authToken) {
		console.error('createPaste: no auth token');
		return false;
	}

	if (!content || content.trim() === '') {
		alert('Content is required');
		return;
	}

	if (content.length > 10000) {
		alert('Content must be less than 10000 characters');
		return;
	}

	try {
		const response = await fetch(`${config.apiUrl}/api/pastes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': authToken
			},
			body: JSON.stringify({ content: content })
		});

		if (response.ok) {
			const data = await response.json();
			window.location.href = `/paste/${data._id}`;
		} else {
			console.error('Failed to create paste:', response.status, response.statusText);
			alert('Failed to create paste. Please try again.');
		}
	} catch (error) {
		console.error('Failed to create paste:', error);
		alert('Failed to create paste. Please try again.');
	}
}
