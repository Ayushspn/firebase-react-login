const initialState = {
    email : ''
}

const reducer = (state = initialState , action) => {
    if(action.type === 'INCREMENT') {
        console.log('action.type', action.payload)
    }
    return state;

}

export default reducer;