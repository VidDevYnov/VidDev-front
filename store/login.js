import axios from 'axios';


export const actions = {
    async connection({ commit }, { user }) {
        try {
            const res = await axios.post(
                'http://localhost:8000/api/login',
                { ...user },
                { 'Content-Type': 'application/json' }
            )

            localStorage.setItem('refresh_token', res.data.refresh_token)
            localStorage.setItem('token', res.data.token)

            commit('notification/create', { description: 'Vous êtes connecté' }, { root: true })
            this.$router.push('/user/profil')
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la connection', type: 'error' }, { root: true })
        }
    },


    async refreshToken({ commit }) {
        try {
            const res = await axios.post(
                'http://localhost:8000/api/token/refresh',
                { "refresh_token": localStorage.getItem('refresh_token') },
                { 'Content-Type': 'application/json' }
            )

            localStorage.setItem('refresh_token', res.data.refresh_token)
            localStorage.setItem('token', res.data.token)

        } catch (error) {
        }
    },
}