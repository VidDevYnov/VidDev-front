import axios from 'axios'
import { config } from '../services/tokenHelper'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'


export const state = () => ({
    article_categories: {},
    article_sizes: {},
    article_types: {},
    article_materials: {},
    article_states: {},
})


export const mutations = {
    set(state, { filter, stateName }) {
        state[stateName] = filter
    },
    setObjectId(state, { value, stateName, fieldName, id }) {
        state[stateName][id][fieldName] = value
    },
}

export const actions = {
    async setFilter({ commit }, filterName) {
        try {
            const filter = await axios.get(`${process.env.NUXT_ENV_PATH}/api/${filterName}`)
            commit('set', {
                stateName: filterName,
                filter: { ...filter.data },
            })
        } catch (error) {
        }
    },

    async createFilter({ commit }, { filter }) {
        try {
            await axios.post(`${process.env.NUXT_ENV_PATH}/api/${filter.name}`, {
                worded: filter.worded,

            },
                config()
            )
            commit('notification/create', { description: 'Le filtre à bien été ajouter' }, { root: true })

        } catch (error) {
            commit('notification/create', { description: "Problème lors de l'ajout du filtre", type: 'error' }, { root: true })
        }
    },

    async modifyFilter({ commit }, { filter }) {
        try {
            await axios.put(`${process.env.NUXT_ENV_PATH}/api/${filter.name}/${filter.id}`, { worded: filter.worded }, config())
            commit('notification/create', { description: 'Le filtre à bien été mis à jour' }, { root: true })

        } catch (error) {
            commit('notification/create', { description: "Problème lors de la mise à jour", type: 'error' }, { root: true })
        }
    },


    async deleteFilter({ commit }, { filter }) {
        try {
            await axios.delete(`${process.env.NUXT_ENV_PATH}/api/${filter.name}/${filter.id}`, config())
            commit('notification/create', { description: 'Le filtre à été supprimé' }, { root: true })

        } catch (error) {
            commit('notification/create', { description: "Problème lors de la suppression du filtre", type: 'error' }, { root: true })
        }
    },
}
