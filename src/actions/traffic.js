import wsAPI from './utils';

const trafficActions = {
    subscribe: () => dispatch => {
        let contentBody = { type: "SUBSCRIBE" };
        dispatch(contentBody);
        wsAPI.send(contentBody);
    },
    fetchTrafficData: kwargs => dispatch => {
        dispatch({ type: "FETCH_TRAFFIC_DATA_TRY", kwargs });
        wsAPI.send(kwargs);
    },
    flopLineSeriesVisibility: kwargs => dispatch => {
        dispatch({ type: "FLOP_LINE_SERIES_VISIBILITY", kwargs });
    },
};

export default trafficActions;
