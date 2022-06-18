import axios from 'axios'

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
        articles: [...categorie.data['hydra:member']],
      })

      commit('set', {
        stateName: 'sizes',
        articles: [...taille.data['hydra:member']],
      })

      commit('set', {
        stateName: 'types',
        articles: [...type.data['hydra:member']],
      })
      commit('set', {
        stateName: 'materials',
        articles: [...matière.data['hydra:member']],
      })
      commit('set', {
        stateName: 'states',
        articles: [...etat.data['hydra:member']],
      })
    } catch (error) {
      console.log(error)
    }
  },
}
