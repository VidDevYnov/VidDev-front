import axios from 'axios'
import { tryConvertStringToNumber } from '../services/numberHelper'
import { config } from '../services/tokenHelper'

export const state = () => ({
    userArticles: [],
    articles: [],
    article: [],
    categories: [],
    sizes: [],
    types: [],
    materials: [],
    states: [],
    pagination: [],
    new: [],
    lastPageUrl: ""

})

export const mutations = {
    set(state, { articles, stateName }) {
        state[stateName] = articles
    },
    setObjectId(state, { value, stateName, fieldName, id }) {
        state[stateName][fieldName][id] = value
    },
    setValue(state, { value, stateName, fieldName }) {
        state[stateName][fieldName] = value
    },
}

export const actions = {
    async setUserArticles({ commit }, idUser) {
        try {
            const articles = await axios.get(`${process.env.NUXT_ENV_PATH}/api/articles?exists[orderArticle]=false&user=${idUser}`)
            commit('set', {
                stateName: 'userArticles',
                articles: { ...articles.data },
            })

        } catch (error) {
        }
    },
    async setArticles({ commit }) {
        try {
            const articles = await axios.get(`${process.env.NUXT_ENV_PATH}/api/articles?exists[orderArticle]=false`)
            commit('set', {
                stateName: 'articles',
                articles: { ...articles.data },
            })
        } catch (error) {
        }
    },

    async setArticle({ commit }, { idArticle }) {
        try {

            const article = await axios.get(
                `${process.env.NUXT_ENV_PATH}/api/articles/${idArticle}`
            )
            commit('set', { stateName: 'article', articles: { ...article.data } })
        } catch (error) {
        }
    },

    async setArticlesFilter({ commit }, { url }) {
        try {
            const articles = await axios.get(
                `${process.env.NUXT_ENV_PATH}${url}`, {
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/ld+json'
                }
            }
            )
            commit('set', { stateName: 'articles', articles: { ...articles.data['hydra:member'] } })
            commit('set', { stateName: 'lastPageUrl', articles: articles.data['hydra:view']['hydra:last'] })
        } catch (error) {
        }
    },

    async getArticlesFilter({ commit }) {
        try {
            const [categorie, taille, type, matière, etat] = await Promise.all([
                axios.get(`${process.env.NUXT_ENV_PATH}/api/article_categories`),
                axios.get(`${process.env.NUXT_ENV_PATH}/api/article_sizes`),
                axios.get(`${process.env.NUXT_ENV_PATH}/api/article_types`),
                axios.get(`${process.env.NUXT_ENV_PATH}/api/article_materials`),
                axios.get(`${process.env.NUXT_ENV_PATH}/api/article_states`),
            ])

            commit('set', {
                stateName: 'categories',
                articles: [...categorie.data],
            })

            commit('set', {
                stateName: 'sizes',
                articles: [...taille.data],
            })

            commit('set', {
                stateName: 'types',
                articles: [...type.data],
            })
            commit('set', {
                stateName: 'materials',
                articles: [...matière.data],
            })
            commit('set', {
                stateName: 'states',
                articles: [...etat.data],
            })
        } catch (error) {
        }
    },
    async createArticle({ commit, dispatch }, { article, idUser, formData }) {
        try {


            article.price = tryConvertStringToNumber(article.price)

            article.user = `api/users/${idUser}`

            const newArticle = await axios.post(`${process.env.NUXT_ENV_PATH}/api/articles`, {
                ...article
            },
                config()
            )

            dispatch('createArticleImage', { idArticle: newArticle.data.id, formData })

        } catch (error) {
            commit('notification/create', { description: "Problème lors de l'ajout de l'article", type: 'error' }, { root: true })
        }
    },

    async createArticleImage({ commit }, { idArticle, formData }) {
        try {
            await axios.post(`${process.env.NUXT_ENV_PATH}/api/imageArticle/${idArticle}`, formData, config())
            commit('notification/create', { description: 'Les modification on été réaliser avec succèes' }, { root: true })

        } catch (error) {
            commit('notification/create', { description: "Un problème à eu lieu", type: 'error' }, { root: true })
        }
    },

    async modifyArticle({ commit }, { article }) {
        try {
            const articleId = article.id
            article = {
                "name": article.name,
                "brand": article.brand,
                "articleSize": `api/article_sizes/${article.articleSize.id}`,
                "description": article.description,
                "price": tryConvertStringToNumber(article.price),
                "articleState": `api/article_states/${article.articleState.id}`,
                "color": article.color,
                "articleType": `api/article_types/${article.articleType.id}`,
                "articleMaterial": `api/article_materials/${article.articleMaterial.id}`,
                "articleCategory": `api/article_categories/${article.articleCategory.id}`,
            }

            await axios.put(`${process.env.NUXT_ENV_PATH}/api/articles/${articleId}`, article, config())
            commit('notification/create', { description: 'Votre article à bien été mis à jours' }, { root: true })

        } catch (error) {
            commit('notification/create', { description: "Problème lors de la mise à jours", type: 'error' }, { root: true })
        }
    },


    async deleteArticle({ commit }, { idArticle }) {
        try {
            await axios.delete(`${process.env.NUXT_ENV_PATH}/api/articles/${idArticle}`, config())
            commit('notification/create', { description: 'Vous avez supprimé un article' }, { root: true })

        } catch (error) {
            commit('notification/create', { description: "Problème lors de la suppression de l'article", type: 'error' }, { root: true })
        }
    },
}
