import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HomePage from './components/home';
import TracePage from './components/trace';
import EditPage from './components/edit';

import trafficActions from './actions/traffic';
import traceActions from './actions/trace';
import editActions from './actions/edit';
import websocketActions from './actions/websocket';


const createReduxConnection = (actionMap, state) => {
    return connect(
        state => ({...state}),
        dispatch => bindActionCreators(actionMap, dispatch)
    );
}

const homeReduxConnection = createReduxConnection({
    ...trafficActions,
    ...websocketActions,
}, "websocket", "traffic");

const traceReduxConnection = createReduxConnection({
    ...traceActions,
    ...websocketActions,
}, "websocket", "trace");

const editReduxConnection = createReduxConnection({
    ...editActions,
    ...websocketActions,
}, "websocket", "edit");

const Home = homeReduxConnection(HomePage);
const Edit = editReduxConnection(EditPage);
const Trace = traceReduxConnection(TracePage);

const Container = {
    Home: Home,
    Edit: Edit,
    Trace: Trace,
}
export default Container;
