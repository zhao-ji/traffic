import { combineReducers } from 'redux';
import traffic from './traffic';
import websocket from './websocket';

export default combineReducers({
    traffic: traffic,
    websocket: websocket,
})
