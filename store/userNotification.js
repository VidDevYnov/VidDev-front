import axios from 'axios'
import { config } from '../services/tokenHelper'

export const actions = {


    async createNotification({ commit }, { notification }) {
        try {

            await axios.post(`${process.env.path}/api/notifications`, notification, config())

        } catch (error) {
            commit('notification/create', { description: "Problème lors de la création de la notification", type: 'error' }, { root: true })
        }
    },

    async changeIsView({ commit }, id) {
        try {

            await axios.put(`${process.env.path}/api/notifications/${id}`, {
                isView: true
            }, config())

        } catch (error) {
        }
    },
}
