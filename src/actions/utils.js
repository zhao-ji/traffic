import ReconnectingWebSocket from 'shopify-reconnecting-websocket';

const wsAPI = (() => {
    let socket;
    return {
        connect: () => {
            const scheme = window.location.protocol === 'https' ? 'wss' : 'ws';
            const url = `${scheme}://${window.location.host}/`;
            socket = ReconnectingWebSocket(url);
        },
        send: (kwargs) => {
            socket.send(JSON.stringify(kwargs));
        },
        close: () => {
            if (socket && socket.readyState !== socket.CLOSED) {
                socket.close();
            }
        },
        listen: store => {
            socket.onopen = () => {
                store.dispatch({ type: "WS_CONNECTION_OPENED" });
            };
            socket.onclose = () => {
                store.dispatch({ type: "WS_CONNECTION_CLOSED" });
            };
            socket.onmessage = (message) => {
                const action = JSON.parse(message.data);
                switch (action.type) {
                    case "PING": 
                        wsAPI.send({
                            type: "PONG"
                        });
                        break;
                    default:
                        store.dispatch(action);
                        break;
                }
            };
        },
    };
})();

export default wsAPI;
