import { createSelector } from 'reselect'

export const categoryList = createSelector(
    [state => state.category],
    app => app.categoryList
)