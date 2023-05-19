import { redirect } from '@sveltejs/kit';
import isAuthed from '../lib/auth/isAuthed';
import getPastes from '$lib/paste/getPastes';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{props: {
 * 	authenticated: boolean,
 * 	pastes: Array<{
 * 	  	_id: string,
 * 	  	content: string,
 *  	likes: number,
 * 	    dislikes: number,
 *      authorId: string,
 *      authorName: string,
 *      charCount: number,
 * 		createdAt: string,
 * 	}>
 * }}>}
 */
export async function load({ fetch }) {
	const isAuthenticated = await isAuthed(fetch);

	if (isAuthenticated) {
		let pastes = await getPastes(fetch, 0, 12);

		return {
			props: {
				authenticated: true,
				pastes
			}
		};
	} else {
		throw redirect(301, '/signup');
	}
}
