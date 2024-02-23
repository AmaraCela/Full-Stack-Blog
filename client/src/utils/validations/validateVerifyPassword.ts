export function validateVerify(password: string, verify: string) {
    return password === verify ? '' : 'Passwords should match.';
}