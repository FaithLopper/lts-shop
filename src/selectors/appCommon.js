import { createSelector } from 'reselect'

export const mobileLoading = createSelector(
    [state => state.appCommon],
    app => app.mobileLoading
)

export const getIsPaymenting = createSelector(
    [state => state.appCommon],
    app => app.isPaymenting
)

export const showModal = createSelector(
    [state => state.appCommon],
    app => app.showModal
)

export const intentToPayment = createSelector(
    [state => state.appCommon],
    app => app.intentToPayment
)

export const desktopLoading = createSelector(
    [state => state.appCommon],
    app => app.desktopLoading
)

export const currentMenuItem = createSelector(
    [state => state.appCommon],
    app => app.currentMenuItem
)

// export const clientInfo = createSelector(
//     [state => state.appCommon],
//     app => app.clientInfo
// )

export const clientList = createSelector(
    [state => state.appCommon],
    app => app.clientList
)

export const clientId = createSelector(
    [state => state.appCommon],
    app => app.clientId
)

export const currentScrollY = createSelector(
    [state => state.appCommon],
    app => app.currentScrollY,
)

export const isNotGetInitialData = createSelector(
    [state => state.appCommon],
    app => app.isNotGetInitialData,
)