import wsAPI from './utils';

const traceActions = {
    fetchTraceData: kwargs => dispatch => {
        dispatch({ type: "FETCH_TRACE_DATA_TRY", kwargs });
        wsAPI.send(kwargs);
    },
}

export default traceActions;
