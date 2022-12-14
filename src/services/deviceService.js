/*
 * wrap function from native device
 */

// source prod = window, dev = mock file
const source = window
const noOps = () => {}
const wrapCallFunction = funcName => params => {
    try {
        return source[funcName](params)
    } catch (error) {
    }
}

const showDeviceLoading = wrapCallFunction('showDeviceLoading')
const hideDeviceLoading = wrapCallFunction('hideDeviceLoading')
const registerService = wrapCallFunction('registerService')

const exportFunction = (funcName, func) => {
    window[funcName] = func
}

const deviceService = {
    showDeviceLoading,
    hideDeviceLoading,
    registerService,
    exportFunction,
}

export default deviceService
