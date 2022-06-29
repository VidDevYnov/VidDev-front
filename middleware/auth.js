export default function ({ redirect, route, store }) {
    const role = store.state.user.profil.role

    if (role) {
        if (route.path.startsWith('/user') && role[0] !== "ROLE_USER") {
            return redirect('/auth/login')
        }
    }


}
