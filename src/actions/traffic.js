import wsAPI from './utils';

const trafficActions = {
    connect: kwargs => dispatch => {
        dispatch({ type: "LOGIN_TRY", kwargs });
        wsAPI.connect();
        dispatch({ type: "LOGIN_SUCCESS", kwargs });
    },
    fetchTrafficData: kwargs => dispatch => {
        dispatch({ type: "FETCH_TRAFFIC_DATA_TRY", kwargs });
        wsAPI.send(kwargs);
    },
}

export default trafficActions
