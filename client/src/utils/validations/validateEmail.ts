export function validateEmail(value: string): string {
    const re = /.+@[a-zA-Z]+\..+/;
    return re.test(value) ? '' : 'Enter a valid email.';
}