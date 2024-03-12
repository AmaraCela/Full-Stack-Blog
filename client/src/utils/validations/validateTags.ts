export function validateTags (tags: string[]) {
    if (tags) {
        return tags.length === 0 ? 'You must select at least one tag.' : ''
    }
    return 'You must select at least one tag.'
}