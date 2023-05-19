import { redirect } from '@sveltejs/kit';
import isAuthed from '../lib/auth/isAuthed';

export async function load({ fetch }) {
	const isAuthenticated = await isAuthed(fetch);

	if (isAuthenticated) {
		return {
			props: {
				authenticated: true
			}
		};
	} else {
		throw redirect(301, '/login');
	}
}
