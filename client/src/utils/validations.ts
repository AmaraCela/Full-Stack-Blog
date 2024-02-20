export function validateUsername(values: string[]): string {
    const username = values[0]
    if (username.length < 3) {
        return 'Username must be longer than 3 characters.'
    }
    return '';
}


export function validateEmail(values: string[]): string {
    const email = values[0];
    const re = /.+@[a-zA-Z]+\..+/;
    if (re.test(email)) {

        return '';
    }
    return 'Enter a valid email'
}

export function validatePassword(values: string[]): string {
    const password = values[0];
    if (password.length >= 8) {
        return '';
    }
    return 'Password should be at least 8 characters.'

}

export function validateVerify(values: string[]) {
    const password = values[0];
    const verify = values[1];
    if (password === verify) {
        return '';
    }
    return 'Passwords should match'
}