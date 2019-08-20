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
            // last time we recieved the update data
            lastUpdate: null,
            // subscribe data and live update data
            results: [],
            // user choose data range
            period: [],
        },
        trace: {
            suggestions: {
                isLoading: false,
                results: [],
                type: null,
            },
            google: {
                isLoading: false,
                result: null,
                lastUpdate: null,
            },
            bing: {
                isLoading: false,
                result: null,
                lastUpdate: null,
            },
        },
    };
}

const store = (function configureStore() {
    return applyMiddleware(thunk)(createStore)(
        rootReducer,
        initialState(),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
})()

export default store;
