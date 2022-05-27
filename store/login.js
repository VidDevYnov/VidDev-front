import axios from 'axios';
import VueCookies from 'vue-cookies'


export const actions = {
    async connection({ commit }, { user }) {
        try {
            console.log(user)
            const res = await axios.post(
                'http://localhost:8000/api/login',
                { ...user },
                { 'Content-Type': 'application/json' }
            )
            VueCookies.set('refresh_token', res.data.refresh_token, { httpOnly: true });
            VueCookies.set('token', res.data.token, { httpOnly: true });

        } catch (error) {
            console.log(error)
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
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }
    },
}