import getUserInfo from '$lib/auth/getUserInfo.js';
import isAuthed from '$lib/auth/isAuthed';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const isAuthenticated = await isAuthed(fetch);

	if (isAuthenticated) {
		const userInfo = await getUserInfo(fetch);

		return {
			props: {
				authenticated: true,
				userInfo
			}
		};
	} else {
		throw redirect(301, '/signin');
	}
}
