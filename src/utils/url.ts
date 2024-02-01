// url拼接
export const fullurl = (path: string) => {
    const url = [
        import.meta.env.VITE_APP_BASE_URL,
        '/',
        path
    ].join('')
    return url
}