

export const HandleSocket = () => {
    const socket = new WebSocket(`ws://localhost:8080`);
    console.log('in socket starting');
    socket.onopen = () => {
        console.log('Connected to server');
    };
    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
        console.log('Disconnected from server');
    };
    console.log('in socket ending');
    return socket;
};
