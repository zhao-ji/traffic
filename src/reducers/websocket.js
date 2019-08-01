export default (state = {}, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case 'WS_CONNECTION_TRY': {
            newState.isLoading = true;
            newState.connected = false;
            return newState
        }
        case 'WS_CONNECTION_OPENED': {
            newState.isLoading = false;
            newState.connected = true;
            return newState
        }
        case 'WS_CONNECTION_CLOSED': {
            newState.isLoading = false;
            newState.connected = false;
            return newState
        }
        default:
            return newState;
    }
}
