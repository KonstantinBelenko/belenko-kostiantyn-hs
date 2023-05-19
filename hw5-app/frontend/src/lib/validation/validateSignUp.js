import { validate } from 'email-validator';

/**
 * @param {string} email
 * @param {string} name
 * @param {string} password
 * @param {string} passwordConfirm
 */
export default function validateSignUp(email, name, password, passwordConfirm) {
	if (!email || !password || !name || !passwordConfirm) {
		return 'Please enter both email and name and password.';
	}

	if (!validate(email)) {
		return 'Please enter a valid email address.';
	}

	if (!name) {
		return 'Please enter your name.';
	}

	if (name.length > 30) {
		return 'Name should be less than 30 characters long.';
	}

	if (password.length < 8) {
		return 'Password should be at least 8 characters long.';
	}

	if (password.length > 64) {
		return 'Password should be less than 64 characters long.';
	}

	if (password !== passwordConfirm) {
		return 'Passwords do not match.';
	}

	return '';
}
