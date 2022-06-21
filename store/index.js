export const getters = {
    getStateFromString: (state) => (stateToConvert) => {
        const stateInformation = stateToConvert.split('.')
        if(stateInformation.length === 2) {
            return {
                storeName: stateInformation[0],
                fieldName: stateInformation[1],
                value: state[stateInformation[0]][stateInformation[1]],
            }
        }
        if(stateInformation.length === 3) {
            return {
                storeName: stateInformation[0],
                stateName: stateInformation[1],
                fieldName: stateInformation[2],
                value: state[stateInformation[0]][stateInformation[1]][stateInformation[2]],
            }
        }
        return {
            storeName: stateInformation[0],
            stateName: stateInformation[1],
            index: stateInformation[2],
            fieldName: stateInformation[3],
            value: state[stateInformation[0]][stateInformation[1]][stateInformation[2]][stateInformation[3]],
        }
    }
}