import axios from 'axios';

export const state = () => ({
    profil: [],
})

export const mutations = {
    set(state, { user, stateName }) {
        state[stateName] = user
    },

    setValue(state, { value, stateName, fieldName }) {
        state[stateName][fieldName] = value
    },

    modifyAddress(state, { value, fieldName, idAddress }) {
        state.profil.addresses[idAddress][fieldName] = value
    },
}

export const actions = {
    async createUser({ commit }, { user }) {
        try {
            await axios.post('http://localhost:8000/api/users', {
                ...user
            })
            commit('notification/create', { description: 'Vous êtes inscrit' }, { root: true })
            this.$router.push('/auth/login')

        } catch (error) {
            commit('notification/create', { description: "Problème lors de l'inscription", type: 'error' }, { root: true })
        }
    },

    async setProfil({ commit }) {
        try {
            const token = localStorage.getItem('token')

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

    async modifyProfil({ commit }, { user, idUser }) {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.put(`http://localhost:8000/api/users/${idUser}`,
                user,
                config
            )
            commit('notification/create', { description: 'Le profil à bien été mis en à jour' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la récupération de votre profil', type: 'error' }, { root: true })
        }
    },


    async modifyAddress({ commit }, { address, idAddress }) {
        try {
            const token = localStorage.getItem('token')

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.put(`http://localhost:8000/api/addresses/${idAddress}`,
                address,
                config
            )
            commit('notification/create', { description: 'L\'adresse à bien été mis à jour' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la modification de l\'address', type: 'error' }, { root: true })
        }
    },


    async deleteAddress({ commit }, { idAddress }) {
        try {
            const token = localStorage.getItem('token')

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.delete(`http://localhost:8000/api/addresses/${idAddress}`,
                config
            )
            commit('notification/create', { description: 'L\'adresse à bien été supprimé' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la suppression de l\'address', type: 'error' }, { root: true })
        }
    },


    async addAddress({ commit }, { user, address }) {
        try {
            const token = localStorage.getItem('token')

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.post(`http://localhost:8000/api/addresses`,
                { ...address, user },
                config
            )
            commit('notification/create', { description: 'L\'adresse à bien été ajouté' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de l\'ajout de l\'address', type: 'error' }, { root: true })
        }
    },


    async addProfilImage({ commit }, { idUser, formData }) {
        try {
            await axios.post(`http://localhost:8000/api/users/${idUser}/image`, formData)
            commit('notification/create', { description: 'L\'image à bien été ajouté' }, { root: true })

        } catch (error) {
            commit('notification/create', { description: 'Problème lors de l\'ajout de l\'image', type: 'error' }, { root: true })
        }
    }
}



