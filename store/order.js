import axios from 'axios'
// import { tryConvertStringToNumber } from '../services/numberHelper'
import { config } from '../services/tokenHelper'

export const actions = {


    async orderArticle({ commit, dispatch }, { order, user, article, remise }) {
        try {
            const setorder = await axios.post(`http://localhost:8000/api/orders`, order, config())

            await axios.put(`http://localhost:8000/api/articles/${article.id}`, { orderArticle: `api/orders/${setorder.data.id}` }, config())


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


            commit('notification/create', {
                description: 'Votre commande c\'est bien passé'
            }, { root: true })

        } catch (error) {
            commit('notification/create', { description: "Problème lors de la commande", type: 'error' }, { root: true })
        }
    },

}
