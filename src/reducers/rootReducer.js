import { combineReducers } from 'redux';
import traffic from './traffic';
import trace from './trace';
import edit from './edit';
import websocket from './websocket';

export default combineReducers({
    trace: trace,
    edit: edit,
    traffic: traffic,
    websocket: websocket,
})
