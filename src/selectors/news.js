import { createSelector } from 'reselect'

export const newsList = createSelector(
    [state => state.news],
    app => app.newsList
)