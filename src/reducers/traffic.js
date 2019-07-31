export default (state = {}, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case 'LOGIN_TRY': {
            return newState
        }
        case 'LOGIN_SUCCESS': {
            newState.websocketConnected = true;
            return newState
        }
        case 'LOGIN_ERROR': {
            return newState
        }
        default:
            return newState;
    }
}
