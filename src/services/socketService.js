/**
 *  initSocket must to call first
 *  TODO: if socket not connected -> conect -> send request, retry connect, ...?
 */
import { io } from 'socket.io-client'

let socket

const makeSocketRequest = (cmd, data) => ({
    cmd,
    data,
    id: new Date().getTime(),
})

export const initSocket = socketHost => {
    socket = io(socketHost, {
        transports: ['websocket'],
    })

    return socket
}

export const receiveSocketRequest = (cmd, requestId) =>
    new Promise((resolve, _) =>
        socket.on(cmd, ({ id, data }) => id === requestId && resolve(data))
    )

export const sendSocketRequest = ({ cmd }, data) => {
    const payload = makeSocketRequest(cmd, data)
    socket.emit(cmd, payload)
    return receiveSocketRequest(cmd, payload.id)
}

export default socket
