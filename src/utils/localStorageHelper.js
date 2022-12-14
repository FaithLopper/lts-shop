export const setObjectData = (key, data) => {
    if (window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(data))
        return true
    }
    return false
}

export const getObjectData = key => {
    let result = false,
        jsonData
    if (window.localStorage && (jsonData = window.localStorage.getItem(key))) {
        try {
            result = JSON.parse(jsonData)
        } catch {}
    }
    return result
}

export const removeKey = key => {
    window.localStorage && window.localStorage.removeItem(key)
}
export const setStringData = (key, value) => {
    if (window.localStorage) {
        window.localStorage.setItem(key, value)
    }
}

export const getStringData = key => {
    if (window.localStorage) {
        return window.localStorage.getItem(key)
    }
    return false
}

export const disableBrowserBack = () => {
    window.history.pushState(null, document.title, window.location.href)
    window.addEventListener('popstate', function (event) {
        console.log('popstate')
        window.history.pushState(null, document.title, window.location.href)
    })
}