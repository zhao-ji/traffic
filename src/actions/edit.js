import wsAPI from './utils';

const editActions = {
    fetchAddress: kwargs => dispatch => {
        dispatch({ type: "FETCH_ADDRESS_TRY", kwargs });
        kwargs.type = "FETCH_ADDRESS_TRY";
        wsAPI.send(kwargs);
    },
    fetchRoute: kwargs => dispatch => {
        dispatch({ type: "FETCH_ROUTE_TRY", kwargs });
        kwargs.type = "FETCH_ROUTE_TRY";
        wsAPI.send(kwargs);
    },
    fetchTrace: kwargs => dispatch => {
        dispatch({ type: "FETCH_TRACE_TRY", kwargs });
        kwargs.type = "FETCH_TRACE_TRY";
        wsAPI.send(kwargs);
    },
}

export default editActions;
