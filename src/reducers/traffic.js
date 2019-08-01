export default (state = {}, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case 'SUBSCRIBE': {
            newState.data.results = [];
            newState.data.lastUpdate = null;
            return newState
        }
        case 'SUBSCRIBE_SUCCESS': {
            newState.data.results = action.data;
            newState.data.lastUpdate = null;
            return newState
        }
        case 'FETCH_TRAFFIC_DATA_TRY': {
            newState.period = {
                isLoading: true,
                kwargs: action.kwargs,
            };
            return newState
        }
        case 'FETCH_TRAFFIC_DATA_SUCCESS': {
            newState.period = {
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
