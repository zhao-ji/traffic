import ReconnectingWebSocket from 'shopify-reconnecting-websocket';

const wsAPI = (() => {
    let socket;
    return {
        connect: () => {
            const scheme = window.location.protocol === 'https' ? 'wss' : 'ws';
            const url = `${scheme}://traffic.minganci.org/ws/`;
            // const url = `${scheme}://${window.location.host}/ws/`;
            socket = new ReconnectingWebSocket(url);
        },
        send: kwargs => {
            socket.send(JSON.stringify(kwargs));
        },
        close: store => {
            if (socket && socket.readyState !== socket.CLOSED) {
                socket.close();
            }
            store.dispatch({ type: "WS_CONNECTION_CLOSED" });
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
                store.dispatch(action);
            };
        },
    };
})();

export default wsAPI;
