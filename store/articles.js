import axios from 'axios'
import { tryConvertStringToNumber } from '../services/numberHelper'
import { config } from '../services/tokenHelper'


export const state = () => ({
    articles: [],
    article: [],
    categories: [],
    sizes: [],
    types: [],
    materials: [],
    states: [],
    filter: [],
    pagination: [],
    new: [],

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
    async setArticles({ commit }) {
        try {
            const articles = await axios.get('http://localhost:8000/api/articles')
            commit('set', {
                stateName: 'articles',
                articles: { ...articles.data['hydra:member'] },
            })
        } catch (error) {
            console.log(error)
        }
    },

    async setArticle({ commit }, { idArticle }) {
        try {

            const article = await axios.get(
                `http://localhost:8000/api/articles/${idArticle}`
            )
            commit('set', { stateName: 'article', articles: { ...article.data } })
        } catch (error) {
            console.log(error)
        }
    },

    async setArticlesFilter({ commit }, { url }) {
        try {
            const articles = await axios.get(
                `http://localhost:8000${url}`
            )
            commit('set', { stateName: 'articles', articles: { ...articles.data['hydra:member'] } })

            commit('set', { stateName: 'pagination', articles: { ...articles.data['hydra:view'] } })
            console.log(articles.data['hydra:view'])



        } catch (error) {
            console.log(error)
        }
    },

    async getArticlesFilter({ commit }) {
        try {
            const [categorie, taille, type, matière, etat] = await Promise.all([
                axios.get(`http://localhost:8000/api/article_categories`),
                axios.get(`http://localhost:8000/api/article_sizes`),
                axios.get(`http://localhost:8000/api/article_types`),
                axios.get(`http://localhost:8000/api/article_materials`),
                axios.get(`http://localhost:8000/api/article_states`),
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
            console.log(error)
        }
    },
    async createArticle({ commit, dispatch }, { article, idUser, formData }) {
        try {

            console.log(article)

            article.price = tryConvertStringToNumber(article.price)

            console.log(article.price)
            article.user = `api/users/${idUser}`

            const newArticle = await axios.post('http://localhost:8000/api/articles', {
                ...article
            },
                config()
            )

            dispatch('createArticleImage', { idArticle: newArticle.data.id, formData })

        } catch (error) {
            console.log(error)
            commit('notification/create', { description: "Problème lors de l'ajout de l'article", type: 'error' }, { root: true })
        }
    },

    async createArticleImage({ commit }, { idArticle, formData }) {
        try {
            await axios.post(`http://localhost:8000/api/imageArticle/${idArticle}`, formData, config())
            commit('notification/create', { description: 'Vous avez créer un article' }, { root: true })

        } catch (error) {
            console.log(error)
            commit('notification/create', { description: "Problème lors de l'ajout de l'article", type: 'error' }, { root: true })
        }
    },

    async modifyArticle({ commit }, { article }) {
        try {
            console.log(article);

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

            console.log(article);

            await axios.put(`http://localhost:8000/api/articles/${articleId}`, article, config())
            commit('notification/create', { description: 'Votre article à bien été mis à jours' }, { root: true })

        } catch (error) {
            console.log(error)
            commit('notification/create', { description: "Problème lors de l'ajout de l'article", type: 'error' }, { root: true })
        }
    },






}
