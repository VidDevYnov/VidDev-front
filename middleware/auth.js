export default function ({ redirect, route, app }) {

    const role = app.$cookiz.get('role')
    
    if (route.path.startsWith('/user') && role !== "ROLE_USER") {
        return redirect('/auth/login')
    }
    if (route.path.startsWith('/admin') && role !== "ROLE_ADMIN") {
        return redirect('/auth/login')
    }
    if (role === "ROLE_ADMIN" && (!route.path.startsWith('/admin') && !route.path.startsWith('/auth'))) {
        return redirect('/admin/dashboard')
    }
}