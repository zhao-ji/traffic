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

        let content = {
        };
        if (kwargs.address) {
            content["address"] = kwargs.address;
        }
        if (kwargs.alias) {
            content["alias"] = kwargs.alias;
        }
        const args = {
            params: {
                address_id: kwargs.address_id,
            },
        };
        axios.put(secrets.apiUrl + "/address", content, args)
            .then(response => {
                dispatch({ type: "UPDATE_ADDRESS_SUCCESS", results: response.data, kwargs });
            })
            .catch(error => {
                dispatch({ type: "UPDATE_ADDRESS_ERROR", error: error, kwargs });
            })
    },
    fetchRoute: kwargs => dispatch => {
        dispatch({ type: "FETCH_ROUTE_TRY", kwargs });

        const args = {
            params: {},
        };
        if (kwargs.address_id) {
            args["params"]["address_id"] = kwargs.address_id;
        }
        axios.get(secrets.apiUrl + "/route", args)
            .then(response => {
                dispatch({ type: "FETCH_ROUTE_SUCCESS", results: response.data, kwargs });
            })
            .catch(error => {
                dispatch({ type: "FETCH_ROUTE_ERROR", error: error, kwargs });
            })
    },
    createRoute: kwargs => dispatch => {
        dispatch({ type: "CREATE_ROUTE_TRY", kwargs });

        const args = {
            start: kwargs.start,
            stop: kwargs.stop,
            method: kwargs.method,
            cron: kwargs.cron,
        };
        axios.post(secrets.apiUrl + "/route", args)
            .then(response => {
                dispatch({ type: "CREATE_ROUTE_SUCCESS", results: response.data, kwargs });
            })
            .catch(error => {
                dispatch({ type: "CREATE_ROUTE_ERROR", error: error, kwargs });
            })
    },
    deleteRoute: kwargs => dispatch => {
        dispatch({ type: "DELETE_ROUTE_TRY", kwargs });

        const args = {
            params: {
                route_id: kwargs.route_id,
            }
        };
        axios.delete(secrets.apiUrl + "/route", args)
            .then(response => {
                dispatch({ type: "DELETE_ROUTE_SUCCESS", results: response.data, kwargs });
            })
            .catch(error => {
                dispatch({ type: "DELETE_ROUTE_ERROR", error: error, kwargs });
            })
    },
    updateRoute: kwargs => dispatch => {
        dispatch({ type: "UPDATE_ROUTE_TRY", kwargs });

        let content = {
        };
        if (kwargs.start) {
            content["start"] = kwargs.address;
        }
        if (kwargs.stop) {
            content["stop"] = kwargs.stop;
        }
        if (kwargs.method) {
            content["method"] = kwargs.method;
        }
        if (kwargs.cron) {
            content["cron"] = kwargs.cron;
        }
        const args = {
            params: {
                route_id: kwargs.route_id,
            },
        };
        axios.put(secrets.apiUrl + "/route", content, args)
            .then(response => {
                dispatch({ type: "UPDATE_ROUTE_SUCCESS", results: response.data, kwargs });
            })
            .catch(error => {
                dispatch({ type: "UPDATE_ROUTE_ERROR", error: error, kwargs });
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
    deleteTrace: kwargs => dispatch => {
        dispatch({ type: "DELETE_TRACE_TRY", kwargs });

        const args = {
            params: {
                trace_id: kwargs.id,
                route_id: kwargs.route_id,
            }
        };
        axios.delete(secrets.apiUrl + "/trace", args)
            .then(response => {
                dispatch({ type: "DELETE_TRACE_SUCCESS", results: response.data, kwargs });
            })
            .catch(error => {
                dispatch({ type: "DELETE_TRACE_ERROR", error: error, kwargs });
            })
    },
}

export default editActions;
