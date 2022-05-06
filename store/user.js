import axios from 'axios';

export const actions = {
    async createUser({ commit }, { user }) {
        try {
            console.log(user)
            await axios.post('http://localhost:8000/api/users', {
                ...user
            })
        } catch (error) {
            console.log(error)
        }
    },

}