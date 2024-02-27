import { createAPI } from "../api";

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