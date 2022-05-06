import axios from 'axios';

export const state = () => ({
    articles: [],
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
}