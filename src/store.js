import { applyMiddleware, combineReducers, createStore } from 'redux'
import * as queryString from 'query-string'

const UPDATE_QUERY_ACTION_TYPE = "filters/update-query"
const UPDATE_MIN_SAUSAGES_ACTION_TYPE = "filters/update-min-sausages"
const UPDATE_MAX_SAUSAGES_ACTION_TYPE = "filters/update-max-sausages"
const UPDATE_MIN_RUFFALOS_ACTION_TYPE = "filters/update-min-ruffalos"
const UPDATE_MAX_RUFFALOS_ACTION_TYPE = "filters/update-max-ruffalos"
const UPDATE_FILTERS_ACTION_TYPES_AND_ATTRIBUTE = {
    [UPDATE_QUERY_ACTION_TYPE]: 'query',
    [UPDATE_MIN_SAUSAGES_ACTION_TYPE]: 'minSausages',
    [UPDATE_MAX_SAUSAGES_ACTION_TYPE]: 'maxSausages',
    [UPDATE_MIN_RUFFALOS_ACTION_TYPE]: 'minRuffalos',
    [UPDATE_MAX_RUFFALOS_ACTION_TYPE]: 'maxRuffalos',
}

const updateFilter = (type) => (value) =>({
    type,
    value
})

export const updateQueryFilter = updateFilter(UPDATE_QUERY_ACTION_TYPE)
export const updateMinSausagesFilter = updateFilter(UPDATE_MIN_SAUSAGES_ACTION_TYPE)
export const updateMaxSausagesFilter = updateFilter(UPDATE_MAX_SAUSAGES_ACTION_TYPE)
export const updateMinRuffalosFilter = updateFilter(UPDATE_MIN_RUFFALOS_ACTION_TYPE)
export const updateMaxRuffalosFilter = updateFilter(UPDATE_MAX_RUFFALOS_ACTION_TYPE)

const initialFilterState = (() => {
    const queryState = queryString.parse(window.location.search)
    return {
        ...{
            query: '',
            minSausages: 0,
            maxSausages: 5,
            minRuffalos: 0,
            maxRuffalos: 5,
        }, 
        ...queryState
    }
})()

function filterReducer(state = initialFilterState, action) {
    const field = UPDATE_FILTERS_ACTION_TYPES_AND_ATTRIBUTE[action.type];
    if (field) {
        return { ...state, [field]: action.value }
    }
    return state
}

const rootReducer = combineReducers({
    'filters': filterReducer
})

const historyUpdateMiddleware = storeAPI => next => action => {
    let result = next(action)
    const params = new URLSearchParams(queryString.stringify(storeAPI.getState().filters))
    window.history.pushState({}, document.title, `${window.location.pathname}?${params}`)
    return result
}

export const store = createStore(rootReducer, applyMiddleware(historyUpdateMiddleware))