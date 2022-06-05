import axios from 'axios';

export const state = () => ({
    articles: [],
    article: [],

})

export const mutations = {
    set(state, { articles, stateName }) {
        state[stateName] = articles
    },
}

export const actions = {
    async setArticles({ commit }) {
        try {
            const articles = await axios.get('http://localhost:8000/api/articles')
            commit('set', { stateName: 'articles', articles: { ...articles.data['hydra:member'] } })
        } catch (error) {
            console.log(error)
        }
    },

    async setArticle({ commit }, { idArticle }) {
        try {
            const article = await axios.get(`http://localhost:8000/api/articles/${idArticle}`)
            commit('set', { stateName: 'article', articles: { ...article.data } })
        } catch (error) {
            console.log(error)
        }
    },
}