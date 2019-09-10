import wsAPI from './utils';

const traceActions = {
    fetchTraceData: kwargs => dispatch => {
        dispatch({ type: "FETCH_TRACE_DATA_TRY", kwargs });
        kwargs.type = "FETCH_TRACE_DATA_TRY";
        wsAPI.send(kwargs);
    },
    fetchBingTraceData: kwargs => dispatch => {
        dispatch({ type: "FETCH_BING_TRACE_DATA_TRY", kwargs });
        kwargs.type = "FETCH_BING_TRACE_DATA_TRY";
        wsAPI.send(kwargs);
    },
    cleanBingTraceData: () => dispatch => {
        dispatch({ type: "CLEAN_BING_TRACE_DATA" });
    },
    fetchAddressSuggestions: kwargs => dispatch => {
        dispatch({ type: "FETCH_ADDRESS_SUGGESTIONS_TRY", kwargs });
        kwargs.type = "FETCH_ADDRESS_SUGGESTIONS_TRY";
        wsAPI.send(kwargs);
    },
    fetchPlace: kwargs => dispatch => {
        dispatch({ type: "FETCH_PLACE_TRY", kwargs });
        kwargs.type = "FETCH_PLACE_TRY";
        wsAPI.send(kwargs);
    },
    cleanAddressSuggestions: () => dispatch => {
        dispatch({ type: "CLEAN_ADDRESS_SUGGESTIONS" });
    },
    cleanPlace: () => dispatch => {
        dispatch({ type: "CLEAN_PLACE" });
    },
}

export default traceActions;
