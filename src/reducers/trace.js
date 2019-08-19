export default (state = {}, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case 'FETCH_TRACE_DATA_TRY': {
            newState.google = {
                isLoading: true,
                kwargs: action.kwargs,
            };
            return newState
        }
        case 'FETCH_TRACE_DATA_SUCCESS': {
            console.log(newState)
            newState.google.isLoading = false;
            newState.google.result = action.data;
            return newState
        }
        case 'FETCH_TRACE_DATA_ERROR': {
            newState.google.isLoading = false;
            newState.google.error = action.data;
            return newState
        }
        default:
            return newState;
    }
}
