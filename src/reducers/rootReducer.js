import { combineReducers } from 'redux';
import traffic from './traffic';
import trace from './trace';
import websocket from './websocket';

export default combineReducers({
    trace: trace,
    traffic: traffic,
    websocket: websocket,
})
