import wsAPI from './utils';

const traceActions = {
    fetchTraceData: kwargs => dispatch => {
        dispatch({ type: "FETCH_TRACE_DATA_TRY", kwargs });
        wsAPI.send(kwargs);
    },
    fetchBingTraceData: kwargs => dispatch => {
        dispatch({ type: "FETCH_BING_TRACE_DATA_TRY", kwargs });
        wsAPI.send(kwargs);
    },
    fetchAddressSuggestions: kwargs => dispatch => {
        dispatch({ type: "FETCH_ADDRESS_SUGGESTIONS_TRY", kwargs });
        wsAPI.send(kwargs);
    },
}

export default traceActions;
