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
            newState.google.isLoading = false;
            newState.google.result = action.data;
            return newState
        }
        case 'FETCH_TRACE_DATA_ERROR': {
            newState.google.isLoading = false;
            newState.google.error = action.data;
            return newState
        }
        case 'FETCH_BING_TRACE_DATA_TRY': {
            newState.bing = {
                isLoading: true,
                kwargs: action.kwargs,
            };
            return newState
        }
        case 'FETCH_BING_TRACE_DATA_SUCCESS': {
            newState.bing.isLoading = false;
            newState.bing.result = action.data;
            return newState
        }
        case 'FETCH_BING_TRACE_DATA_ERROR': {
            newState.bing.isLoading = false;
            newState.bing.error = action.data;
            return newState
        }
        case 'CLEAN_BING_TRACE_DATA': {
            newState.bing.isLoading = false;
            newState.bing.result = null;
            return newState
        }
        case 'FETCH_ADDRESS_SUGGESTIONS_TRY': {
            newState.suggestions = {
                isLoading: true,
                side: action.kwargs.side,
                kwargs: action.kwargs,
            };
            return newState
        }
        case 'FETCH_ADDRESS_SUGGESTIONS_SUCCESS': {
            newState.suggestions.isLoading = false;
            newState.suggestions.results = action.data;
            return newState
        }
        case 'FETCH_ADDRESS_SUGGESTIONS_ERROR': {
            newState.suggestions.isLoading = false;
            newState.suggestions.error = action.data;
            return newState
        }
        case 'CLEAN_ADDRESS_SUGGESTIONS': {
            newState.suggestions.results = [];
            return newState
        }
        case 'FETCH_PLACE_TRY': {
            newState.place = {
                isLoading: true,
                side: action.kwargs.side,
                kwargs: action.kwargs,
            };
            return newState
        }
        case 'FETCH_PLACE_SUCCESS': {
            newState.place.isLoading = false;
            newState.place.results = action.data;
            return newState
        }
        case 'FETCH_PLACE_ERROR': {
            newState.place.isLoading = false;
            newState.place.error = action.data;
            return newState
        }
        case 'CLEAN_PLACE': {
            newState.place.results = [];
            return newState
        }
        default:
            return newState;
    }
}
