import isAuthed from '$lib/auth/isAuthed';
import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
	if (await isAuthed(fetch)) {
		throw redirect(301, '/');
	}
}
