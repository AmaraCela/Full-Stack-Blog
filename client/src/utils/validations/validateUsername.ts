export function validateUsername(value: string): string {
    return value.length >= 3 ? '' : 'Username must be longer than 3 characters.';
}