import { createAPI } from "./api";

export function validateUsername(value: string): string {
    return value.length >= 3 ? '' : 'Username must be longer than 3 characters.';
}

export function validateEmail(value: string): string {
    const re = /.+@[a-zA-Z]+\..+/;
    return re.test(value) ? '' : 'Enter a valid email.';
}

export function validatePassword(value: string): string {
    return value.length >= 8 ? '' : 'Password should be at least 8 characters.';
}

export function validateVerify(password: string, verify: string) {
    return password === verify ? '' : 'Passwords should match.';
}

export async function validateCurrentPassword(currentId: string, currentPassword: string) {
    if (currentPassword.trim() !== '') {
        const passwordData = { user_id: currentId, password: currentPassword };

        try {
            const response = await createAPI('password', { method: 'POST' })(passwordData);

            return !response.ok ? 'Wrong password.' : '';
        } catch (error) {
            return 'Wrong password';
        }
    }
    return 'Enter password.'
}