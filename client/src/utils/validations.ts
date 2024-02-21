export function validateUsername(value: string): string {
    return value.length >= 3 ? '' : 'Username must be longer than 3 characters.';
}


export function validateEmail(value: string): string {
    const re = /.+@[a-zA-Z]+\..+/;
    return re.test(value) ? '' : 'Enter a valid email';
}

export function validatePassword(value: string): string {
   return value.length >= 8 ? '' : 'Password should be at least 8 characters.';
}

export function validateVerify(password: string, verify: string) {
    return password === verify ? '' : 'Passwords should match';
}