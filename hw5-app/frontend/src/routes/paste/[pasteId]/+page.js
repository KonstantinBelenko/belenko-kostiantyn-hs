import getUserInfo from '$lib/auth/getUserInfo.js';
import isAuthed from '$lib/auth/isAuthed';
import config from '$lib/config';
import { redirect } from '@sveltejs/kit';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{props: {
 *  authenticated: boolean,
 *  paste: {
 *      _id: string,
 *      content: string,
 *      likes: number,
 *      dislikes: number,
 *      authorId: string,
 *      authorName: string,
 *      charCount: number,
 *      createdAt: string,
 * }
 * }}>}
 */
export async function load({ fetch, params }) {
	const authToken = localStorage.getItem('authToken');

	if (!authToken) {
		throw redirect(301, '/signin');
	}

	const paste = await fetch(`${config.apiUrl}/api/pastes/${params.pasteId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'auth-token': authToken
		}
	});

	return {
		props: {
			authenticated: true,
			paste: await paste.json()
		}
	};
}
