import wsAPI from './utils';

const editActions = {
    fetchAddress: kwargs => dispatch => {
        dispatch({ type: "FETCH_ADDRESS_TRY", kwargs });
        kwargs.type = "FETCH_ADDRESS_TRY";
        wsAPI.send(kwargs);
    },
    createAddress: kwargs => dispatch => {
        dispatch({ type: "CREATE_ADDRESS_TRY", kwargs });
        kwargs.type = "CREATE_ADDRESS_TRY";
        wsAPI.send(kwargs);
    },
    deleteAddress: kwargs => dispatch => {
        dispatch({ type: "DELETE_ADDRESS_TRY", kwargs });
        kwargs.type = "DELETE_ADDRESS_TRY";
        wsAPI.send(kwargs);
    },
    updateAddress: kwargs => dispatch => {
        dispatch({ type: "UPDATE_ADDRESS_TRY", kwargs });
        kwargs.type = "UPDATE_ADDRESS_TRY";
        wsAPI.send(kwargs);
    },
    fetchRoute: kwargs => dispatch => {
        dispatch({ type: "FETCH_ROUTE_TRY", kwargs });
        kwargs.type = "FETCH_ROUTE_TRY";
        wsAPI.send(kwargs);
    },
    createRoute: kwargs => dispatch => {
        dispatch({ type: "CREATE_ROUTE_TRY", kwargs });
        kwargs.type = "CREATE_ROUTE_TRY";
        wsAPI.send(kwargs);
    },
    deleteRoute: kwargs => dispatch => {
        dispatch({ type: "DELETE_ROUTE_TRY", kwargs });
        kwargs.type = "DELETE_ROUTE_TRY";
        wsAPI.send(kwargs);
    },
    updateRoute: kwargs => dispatch => {
        dispatch({ type: "UPDATE_ROUTE_TRY", kwargs });
        kwargs.type = "UPDATE_ROUTE_TRY";
        wsAPI.send(kwargs);
    },
    fetchTrace: kwargs => dispatch => {
        dispatch({ type: "FETCH_TRACE_TRY", kwargs });
        kwargs.type = "FETCH_TRACE_TRY";
        wsAPI.send(kwargs);
    },
    deleteTrace: kwargs => dispatch => {
        dispatch({ type: "DELETE_TRACE_TRY", kwargs });
        kwargs.type = "DELETE_TRACE_TRY";
        wsAPI.send(kwargs);
    },
}

export default editActions;
