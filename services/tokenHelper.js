export function config() {
    const token = window.$nuxt.$cookiz.get('token')

    return {
        headers: { Authorization: `Bearer ${token}` }
    };
}