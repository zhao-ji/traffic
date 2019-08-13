export default (state = {}, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case 'SUBSCRIBE': {
            newState.data.results = [];
            newState.data.lastUpdate = null;
            return newState
        }
        case 'SUBSCRIBE_SUCCESS': {
            action.data.map(item => item.disabled = false)
            newState.data.results = action.data;
            newState.data.lastUpdate = null;
            return newState
        }
        case 'FETCH_TRACE_DATA_TRY': {
            newState.trace = {
                isLoading: true,
                kwargs: action.kwargs,
            };
            return newState
        }
        case 'FETCH_TRACE_DATA_SUCCESS': {
            newState.trace = {
                isLoading: false,
                kwargs: action.kwargs,
                data: action.data,
            };
            return newState
        }
        default:
            return newState;
    }
}
