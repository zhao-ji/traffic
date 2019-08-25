export default (state = {}, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case 'FETCH_ADDRESS_TRY': {
            newState.address.isLoading = true;
            return newState
        }
        case 'FETCH_ADDRESS_SUCCESS': {
            newState.address.isLoading = false;
            newState.address.results = action.data;
            return newState
        }
        case 'FETCH_ADDRESS_ERROR': {
            newState.address.isLoading = false;
            newState.address.error = action.data;
            return newState
        }
        case 'FETCH_ROUTE_TRY': {
            newState.route.isLoading = true;
            return newState
        }
        case 'FETCH_ROUTE_SUCCESS': {
            newState.route.isLoading = false;
            newState.route.results = action.data;
            return newState
        }
        case 'FETCH_ROUTE_ERROR': {
            newState.route.isLoading = false;
            newState.route.error = action.data;
            return newState
        }
        case 'FETCH_TRACE_TRY': {
            newState.trace.isLoading = true;
            return newState
        }
        case 'FETCH_TRACE_SUCCESS': {
            newState.trace.isLoading = false;
            newState.trace.results = action.data;
            return newState
        }
        case 'FETCH_TRACE_ERROR': {
            newState.trace.isLoading = false;
            newState.trace.error = action.data;
            return newState
        }
        default:
            return newState;
    }
}
