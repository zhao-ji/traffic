import store from '../store';
import wsAPI from './utils';

const websocketActions = {
    connect: kwargs => dispatch => {
        dispatch({ type: "WS_CONNECTION_TRY", kwargs });
        wsAPI.connect();
        wsAPI.listen(store);
    },
}

export default websocketActions
