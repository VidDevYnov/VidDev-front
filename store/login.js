import axios from 'axios';

export const actions = {
    async connection({ commit, dispatch }, { user }) {
        try {
            const res = await axios.post(
                `${process.env.path}/api/login`,
                { ...user },
                { 'Content-Type': 'application/json' }
            )

            localStorage.setItem('refresh_token', res.data.refresh_token)
            localStorage.setItem('token', res.data.token)

            await dispatch('user/setProfil', {}, { root: true })

            commit('notification/create', { description: 'Vous êtes connecté' }, { root: true })

            this.$router.push('/user/profil')
        } catch (error) {
            console.log(error)
            commit('notification/create', { description: 'Problème lors de la connection', type: 'error' }, { root: true })

        }
    },


    async refreshToken({ dispatch }) {
        try {
            const res = await axios.post(
                `${process.env.path}/api/token/refresh`,
                { "refresh_token": localStorage.getItem('refresh_token') },
                { 'Content-Type': 'application/json' }
            )

            localStorage.setItem('refresh_token', res.data.refresh_token)
            localStorage.setItem('token', res.data.token)
            dispatch('user/setProfil', {}, { root: true })


        } catch (error) {
        }
    },
}