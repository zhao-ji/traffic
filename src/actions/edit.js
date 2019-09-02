import axios from 'axios';
import { secrets } from './secrets';

const editActions = {
    fetchAddress: kwargs => dispatch => {
        dispatch({ type: "FETCH_ADDRESS_TRY", kwargs });

        axios.get(secrets.apiUrl + "/address")
            .then(response => {
                dispatch({ type: "FETCH_ADDRESS_SUCCESS", results: response.data, kwargs });
            })
            .catch(error => {
                dispatch({ type: "FETCH_ADDRESS_ERROR", error: error, kwargs });
            })
    },
    createAddress: kwargs => dispatch => {
        dispatch({ type: "CREATE_ADDRESS_TRY", kwargs });

        const args = {
            address: kwargs.address,
            alias: kwargs.alias,
        };
        axios.post(secrets.apiUrl + "/address", args)
            .then(response => {
                dispatch({ type: "CREATE_ADDRESS_SUCCESS", results: response.data, kwargs });
            })
            .catch(error => {
                dispatch({ type: "CREATE_ADDRESS_ERROR", error: error, kwargs });
            })
    },
    deleteAddress: kwargs => dispatch => {
        dispatch({ type: "DELETE_ADDRESS_TRY", kwargs });

        const args = {
            params: {
                address_id: kwargs.address_id,
            }
        };
        axios.delete(secrets.apiUrl + "/address", args)
            .then(response => {
                dispatch({ type: "DELETE_ADDRESS_SUCCESS", results: response.data, kwargs });
            })
            .catch(error => {
                dispatch({ type: "DELETE_ADDRESS_ERROR", error: error, kwargs });
            })
    },
    updateAddress: kwargs => dispatch => {
        dispatch({ type: "UPDATE_ADDRESS_TRY", kwargs });

        axios.put(secrets.apiUrl + "/address")
            .then(response => {
                dispatch({ type: "UPDATE_ADDRESS_SUCCESS", results: response.data, kwargs });
            })
            .catch(error => {
                dispatch({ type: "UPDATE_ADDRESS_ERROR", error: error, kwargs });
            })
    },
    fetchRoute: kwargs => dispatch => {
        dispatch({ type: "FETCH_ROUTE_TRY", kwargs });

        axios.get(secrets.apiUrl + "/route")
            .then(response => {
                dispatch({ type: "FETCH_ROUTE_SUCCESS", results: response.data, kwargs });
            })
            .catch(error => {
                dispatch({ type: "FETCH_ROUTE_ERROR", error: error, kwargs });
            })
    },
    fetchTrace: kwargs => dispatch => {
        dispatch({ type: "FETCH_TRACE_TRY", kwargs });

        const args = {
            params: {
                route_id: kwargs.route_id,
            }
        };
        axios.get(secrets.apiUrl + "/trace", args)
            .then(response => {
                dispatch({ type: "FETCH_TRACE_SUCCESS", results: response.data, kwargs });
            })
            .catch(error => {
                dispatch({ type: "FETCH_TRACE_ERROR", error: error, kwargs });
            })
    },
}

export default editActions;
