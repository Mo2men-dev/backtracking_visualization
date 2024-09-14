export function getTitle() {
    const url = document.URL
    const title = url.split('#')[1]

    switch (title) {
        case 'sudoko':
            return 'Sudoko'
        case 'queens':
            return "N-Queens"
    }

    return 'Sudoko'
}