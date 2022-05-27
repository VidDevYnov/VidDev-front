import axios from 'axios';
import VueCookies from 'vue-cookies'


export const state = () => ({
    profil: [],
})

export const mutations = {
    set(state, { user, stateName }) {
        state[stateName] = user
    },
}

export const actions = {
    async createUser({ commit }, { user }) {
        try {
            console.log(user)
            await axios.post('http://localhost:8000/api/users', {
                ...user
            })
        } catch (error) {
            console.log(error)
        }
    },

    async setProfil({ commit, dispatch }) {
        try {
            await dispatch('login/refreshToken', {}, { root: true })

            const token = VueCookies.get('token')

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const profil = await axios.get('http://localhost:8000/api/profil',
                config
            )

            commit('set', { stateName: 'profil', user: { ...profil.data } })

        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la récupération de votre profil', type: 'error' }, { root: true })
        }
    },
}



