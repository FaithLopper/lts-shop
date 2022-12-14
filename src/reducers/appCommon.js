import { createSlice } from '@reduxjs/toolkit'

import { LANGUAGE } from '../constants/storageKeys'
import { DEFAULT_LANGUAGE } from '../locales/languages'
import { getStringData } from '../utils/localStorageHelper'
import Utils from '../utils'

const initialState = {
    mobileLoading: false,
    desktopLoading: false,
    language: getStringData(LANGUAGE) || DEFAULT_LANGUAGE,
    isPaymenting: false,
    showModal: null,
    intentToPayment: false,
    initLoading: true,
    currentMenuItem: null,
    clientInfo: null,
    clientList: null,
    clientId: null,
    currentScrollY: null,
    isNotGetInitialData: false,
    new:null,
}

const appCommon = createSlice({
    name: 'appCommon',
    initialState,
    reducers: {
        showFullScreenLoading(state) {
            if(Utils.isMobileDevice()) {
                state.mobileLoading = true
            }
            else {
                state.desktopLoading = true
            }
        },
        hideFullScreenLoading(state) {
            if(Utils.isMobileDevice()) {
                state.mobileLoading = false
            }
            else {
                state.desktopLoading = false
            }
        },
        setLanguage(state, action) {
            state.language = action.payload
        },
        setIsPaymenting(state, action)
        {
            state.isPaymenting = action.payload
        },
        setShowModal(state, action)
        {
            state.showModal = action.payload
        },
        setIntentToPayment(state, action)
        {
            state.intentToPayment = action.payload
        },
        setInitLoading(state, action)
        {
            state.initLoading = action.payload
        },
        setCurrentMenuItem(state, action)
        {
            state.currentMenuItem = action.payload
        },
        setClientInfo(state, action)
        {
            state.clientInfo = action.payload
        },
        setClientList(state, action)
        {
            state.clientList = action.payload
        },
        setClientId(state, action)
        {
            state.clientId = action.payload
        },
        setCurrentScrollY(state, action)
        {
            state.currentScrollY = {
                currentScrollY: action.payload.currentScrollY,
                currentNewsIndex: action.payload.currentNewsIndex,
            }
        },
        setIsNotGetInitialData(state, action)
        {
            state.isNotGetInitialData = action.payload
        },
        setNew(state,action)
        {
            state.new = action.payload
        },
    },
})

export const {
    showFullScreenLoading,
    hideFullScreenLoading,
    setIsPaymenting,
    setShowModal,
    setIntentToPayment,
    setInitLoading,
    setCurrentMenuItem,
    setClientInfo,
    setClientList,
    setClientId,
    setCurrentScrollY,
    setIsNotGetInitialData,
    setNew,
} =
    appCommon.actions
export default appCommon.reducer
