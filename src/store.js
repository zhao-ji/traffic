import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

function initialState() {
    return {
        websocket: {
            isLoading: false,
            connected: false,
        },
        traffic: {
            data: {
                lastUpdate: null,
                results: [],
            },
            period: [],
        },
    }
}

const store = (function configureStore() {
    return applyMiddleware(thunk)(createStore)(
        rootReducer,
        initialState(),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
})()

export default store;
