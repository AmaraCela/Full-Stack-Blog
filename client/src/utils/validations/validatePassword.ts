export function validatePassword(value: string): string {
    return value.length >= 8 ? '' : 'Password should be at least 8 characters.';
}