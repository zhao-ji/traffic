import store from '../store';
import wsAPI from './utils';

const websocketActions = {
    connect: kwargs => dispatch => {
        dispatch({ type: "WS_CONNECTION_TRY", kwargs });
        wsAPI.connect();
        wsAPI.listen(store);
    },
    disconnect: kwargs => dispatch => {
        wsAPI.close();
        dispatch({ type: "WS_CONNECTION_CLOSED", kwargs });
    },
}

export default websocketActions
