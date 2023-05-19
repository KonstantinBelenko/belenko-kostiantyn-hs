import { validate } from 'email-validator';

/**
 * @param {string} email
 * @param {string} password
 */
export default function validateSignIn(email, password) {
	if (!email || !password) {
		return 'Please enter both email and password.';
	}

	if (!validate(email)) {
		return 'Please enter a valid email address.';
	}

	if (password.length < 8) {
		return 'Password should be at least 8 characters long.';
	}

	return '';
}
