
const matches = (state: any = [], action: any) => {
    console.log('sate: ', state)

    switch (action.type) {
        case 'ADD_MATCH':
            return state.concat([action.match])
        case 'DELETE_MATCH':
            return state.filter((match) => match.id !== action.id)
        case 'UPDATE':
            return state.map((match) => {
                if (match.id === action.id) {
                    return {
                        ...match,
                        title: action.data.newTitle,
                        message: action.data.newMessage,
                        editing: !match.editing
                    }
                } else return match;
            })
        default:
            return state;
    }
}

export default configuration