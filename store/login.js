import axios from 'axios';
import VueCookies from 'vue-cookies'


export const actions = {
    async connection({ commit }, { user }) {
        try {
            const res = await axios.post(
                'http://localhost:8000/api/login',
                { ...user },
                { 'Content-Type': 'application/json' }
            )
            VueCookies.set('refresh_token', res.data.refresh_token, { httpOnly: true });
            VueCookies.set('token', res.data.token, { httpOnly: true });
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
                { "refresh_token": VueCookies.get('refresh_token') },
                { 'Content-Type': 'application/json' }
            )
            VueCookies.set('refresh_token', res.data.refresh_token, { httpOnly: true });
            VueCookies.set('token', res.data.token, { httpOnly: true });
            console.log('Cron ok')


        } catch (error) {
            console.log('Cron Nok')
            console.log(error)
        }
    },
}