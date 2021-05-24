import { applyMiddleware, combineReducers, createStore } from 'redux'
import * as queryString from 'query-string'
import { composeWithDevTools } from "redux-devtools-extension"

const UPDATE_QUERY_ACTION_TYPE = "filters/update-query"
const UPDATE_MIN_SAUSAGES_ACTION_TYPE = "filters/update-min-sausages"
const UPDATE_MAX_SAUSAGES_ACTION_TYPE = "filters/update-max-sausages"
const UPDATE_MIN_RUFFALOS_ACTION_TYPE = "filters/update-min-ruffalos"
const UPDATE_MAX_RUFFALOS_ACTION_TYPE = "filters/update-max-ruffalos"
const RESET_FILTERS_ACTION_TYPE = "filters/reset"
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
export const resetFilters = { type: RESET_FILTERS_ACTION_TYPE }

const defaultFilterState = {
    query: '',
    minSausages: 0,
    maxSausages: 5,
    minRuffalos: 0,
    maxRuffalos: 5,
}

const initialFilterState = (() => {
    const queryState = queryString.parse(window.location.search)
    return {
        ...defaultFilterState, 
        ...queryState
    }
})()

function filterReducer(state = initialFilterState, action) {
    const actionType = action.type
    if (actionType === RESET_FILTERS_ACTION_TYPE) {
        return defaultFilterState
    }
    const field = UPDATE_FILTERS_ACTION_TYPES_AND_ATTRIBUTE[actionType];
    if (field) {
        return { ...state, [field]: action.value }
    }
    return state
}

const DATASET_LOAD_ACTION_TYPE = "dataset/load"

function datasetReducer(state = {
    loaded: false,
    values: []
}, action) {
    switch (action.type) {
        case DATASET_LOAD_ACTION_TYPE:
            return {
                loaded: true,
                values: action.value
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    'filters': filterReducer,
    'dataset': datasetReducer
})

const historyUpdateMiddleware = storeAPI => next => action => {
    let result = next(action)
    const params = new URLSearchParams(queryString.stringify(storeAPI.getState().filters))
    window.history.pushState({}, document.title, `${window.location.pathname}?${params}`)
    return result
}

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(historyUpdateMiddleware)))
fetch(process.env.PUBLIC_URL + '/dataset.json').then(res => res.json()).then(json => store.dispatch({
    type: DATASET_LOAD_ACTION_TYPE,
    value: json
}))

export const selectFilters = state => state.filters
export const selectResults = state => state.dataset.values
    .filter(sausage => sausage.name.toLowerCase().includes(state.filters.query.toLowerCase()))
    .filter(sausage => sausage.sausages >= state.filters.minSausages && sausage.sausages <= state.filters.maxSausages)
    .filter(sausage => (sausage.ruffalos || 0) >= state.filters.minRuffalos && (sausage.ruffalos || 0) <= state.filters.maxRuffalos)

// TODO if this gets more complex then add https://redux.js.org/recipes/configuring-your-store#simplifying-setup-with-redux-toolkit