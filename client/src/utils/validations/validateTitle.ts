export const validateTitle = (title: string) => {
    return title.trim().length >= 5 && title.trim().length < 200 ? '' : 'Title should be between 5 and 200 characters.'
}