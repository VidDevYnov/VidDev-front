import axios from 'axios';

export const state = () => ({
    member: [],
})

export const mutations = {
    set(state, { member, stateName }) {
        state[stateName] = member
    },
}

export const actions = {

    async setMember({ commit }, idMember) {
        try {

            const member = await axios.get(`${process.env.NUXT_ENV_PATH}/api/users/${idMember}`)
            commit('set', { stateName: 'member', member: { ...member.data } })
        } catch (error) {
        }
    },
}



