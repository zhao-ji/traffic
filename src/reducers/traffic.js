export default (state = {}, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case 'SUBSCRIBE': {
            newState.results = [];
            newState.lastUpdate = null;
            return newState
        }
        case 'SUBSCRIBE_SUCCESS': {
            action.data.map(item => item.disabled = false)
            newState.results = action.data;
            newState.lastUpdate = null;
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
        case 'FLOP_LINE_SERIES_VISIBILITY': {
            newState.results[action.kwargs.num].disabled = !newState.results[action.kwargs.num].disabled;
            return newState
        }
        default:
            return newState;
    }
}
