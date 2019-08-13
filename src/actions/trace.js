import wsAPI from './utils';

const traceActions = {
    subscribe: () => dispatch => {
        let contentBody = { type: "SUBSCRIBE" };
        dispatch(contentBody);
        wsAPI.send(contentBody);
    },
    fetchTraceData: kwargs => dispatch => {
        dispatch({ type: "FETCH_TRACE_DATA_TRY", kwargs });
        wsAPI.send(kwargs);
    },
}

export default traceActions;
