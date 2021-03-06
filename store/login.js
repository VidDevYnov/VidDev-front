import axios from 'axios';

export const actions = {
    async connection({ commit, dispatch }, { user }) {
        try {
            const res = await axios.post(
                `${process.env.NUXT_ENV_PATH}/api/login`,
                { ...user },
                { 'Content-Type': 'application/json' }
            )

            window.$nuxt.$cookiz.set('token', res.data.token, {
                path: '/',
            })

            window.$nuxt.$cookiz.set('refresh_token', res.data.refresh_token, {
                path: '/',
            })


            const profil = await dispatch('user/setProfil', {}, { root: true })

            window.$nuxt.$cookiz.set('role', profil.roles[0], {
                path: '/',
            })

            if (profil.roles[0] === "ROLE_ADMIN") {
                this.$router.push('/admin/filter')
            } else {
                this.$router.push('/user/profil')
            }

            commit('notification/create', { description: 'Vous êtes connecté' }, { root: true })

        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la connection', type: 'error' }, { root: true })
        }
    },


    async refreshToken({ dispatch }) {
        try {

            const res = await axios.post(
                `${process.env.NUXT_ENV_PATH}/api/token/refresh`,
                { "refresh_token": window.$nuxt.$cookiz.get('refresh_token') },
                { 'Content-Type': 'application/json' }
            )

            window.$nuxt.$cookiz.set('token', res.data.token, {
                path: '/',
            })

            window.$nuxt.$cookiz.set('refresh_token', res.data.refresh_token, {
                path: '/',
            })

            dispatch('user/setProfil', {}, { root: true })

        } catch (error) {
        }
    },
}