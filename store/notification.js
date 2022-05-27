export const state = () => ({ list: [] })

export const mutations = {
    create(state, { description, type }) {
        state.list = []
        state.list.push({
            id: Math.random(),
            open: false,
            description,
            type: type ?? 'success',
        })
    },
    open(state, id) {
        const index = state.list.findIndex(notification => notification.id === id)
        state.list[index].open = true
    },
    delete(state, id) {
        state.list = state.list.filter(notification => notification.id !== id)
    },
}
