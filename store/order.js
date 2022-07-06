import axios from 'axios'
import { config } from '../services/tokenHelper'

export const actions = {


    async orderArticle({ commit, dispatch }, { order, user, article, remise }) {
        try {
            const setorder = await axios.post(`${process.env.NUXT_ENV_PATH}/api/orders`, order, config())

            await axios.put(`${process.env.NUXT_ENV_PATH}/api/articles/${article.id}`, { orderArticle: `api/orders/${setorder.data.id}` }, config())


            let setPoint = user.point
            if (remise !== 0) {
                setPoint -= remise
            }

            const setUser = {
                solde: (user.solde - (order.price)),
                point: (setPoint + order.point)
            }

            dispatch('user/modifyProfil', { idUser: user.id, user: setUser }, { root: true })


            const setUserArticle = {
                solde: (article.user.solde + article.price),
            }

            dispatch('user/modifyProfil', { idUser: article.user.id, user: setUserArticle }, { root: true })

            const notification = {
                user: `api/users/${user.id}`,
                isView: false,
                title: `Une commande passée`,
                description: `Vous avez acheté l'article suivant : ${article.name}`,
            }


            dispatch('userNotification/createNotification', { notification }, { root: true })

            dispatch('sendMailBuyeur', { order, user, article })


            commit('notification/create', {
                description: 'Votre commande c\'est bien passé'
            }, { root: true })



        } catch (error) {
            commit('notification/create', { description: "Problème lors de la commande", type: 'error' }, { root: true })
        }
    },

    async sendMailBuyeur({ commit }, { order, user, article }) {
        try {

            await axios.put(`${process.env.NUXT_ENV_PATH}/emailBuyeur`, {

                article,
                order,
                user

            }, config())

        } catch (error) {
            commit('notification/create', { description: "Problème lors de l'envoie du mail", type: 'error' }, { root: true })
        }
    },

    async sendMailSeller({ commit }, { user, article, buyeur }) {
        try {

            await axios.put(`${process.env.NUXT_ENV_PATH}/emailSeller`, {
                article,
                buyeur,
                user

            }, config())

        } catch (error) {
            commit('notification/create', { description: "Problème lors de l'envoie du mail", type: 'error' }, { root: true })
        }

    }
}
