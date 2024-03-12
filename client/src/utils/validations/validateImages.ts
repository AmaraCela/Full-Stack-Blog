export function validateImages (images: FileList | []) {
    if (images) {
        return images.length === 0 ? 'You must add at least one image.' : ''
    }
    return 'You must add at least one image.';
}