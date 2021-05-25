import { applyMiddleware, combineReducers, createStore } from 'redux'
import * as queryString from 'query-string'
import { composeWithDevTools } from "redux-devtools-extension"

const parseIntInRange = (min, max) => (str) => Math.min(max, Math.max(min, parseInt(str)))
const parseScore = parseIntInRange(0, 5)

const UPDATE_QUERY_ACTION_TYPE = "filters/update-query"
const UPDATE_MIN_SAUSAGES_ACTION_TYPE = "filters/update-min-sausages"
const UPDATE_MAX_SAUSAGES_ACTION_TYPE = "filters/update-max-sausages"
const UPDATE_MIN_RUFFALOS_ACTION_TYPE = "filters/update-min-ruffalos"
const UPDATE_MAX_RUFFALOS_ACTION_TYPE = "filters/update-max-ruffalos"
const UPDATE_INCLUDE_SAUSAGE_DISQUALIFIED_ACTION_TYPE = "filters/update-sausage-disqualified"
const UPDATE_INCLUDE_WILL_IT_BLOW_DISQUALIFIED_ACTION_TYPE = "filters/update-will-it-blow-disqualified"
const UPDATE_INCLUDE_MISSING_WILL_IT_BLOW_ACTION_TYPE = "filters/update-missing-will-it-blow-disqualified"
const RESET_FILTERS_ACTION_TYPE = "filters/reset"
const UPDATE_FILTERS_ACTION_TYPES_AND_ATTRIBUTE = {
    [UPDATE_QUERY_ACTION_TYPE]: {
        field: 'query',
        defaultValue: ''
    },
    [UPDATE_MIN_SAUSAGES_ACTION_TYPE]: {
        field: 'minSausages',
        converter: parseScore,
        defaultValue: 0
    },
    [UPDATE_MAX_SAUSAGES_ACTION_TYPE]: {
        field: 'maxSausages',
        converter: parseScore,
        defaultValue: 5
    },
    [UPDATE_MIN_RUFFALOS_ACTION_TYPE]: {
        field: 'minRuffalos',
        converter: parseScore,
        defaultValue: 0
    },
    [UPDATE_MAX_RUFFALOS_ACTION_TYPE]: {
        field: 'maxRuffalos',
        converter: parseScore,
        defaultValue: 5
    },
    [UPDATE_INCLUDE_SAUSAGE_DISQUALIFIED_ACTION_TYPE]: {
        field: 'includeSausageDisqualified',
        converter: Boolean,
        defaultValue: true
    },
    [UPDATE_INCLUDE_WILL_IT_BLOW_DISQUALIFIED_ACTION_TYPE]: {
        field: 'includeWillItBlowDisqualified',
        converter: Boolean,
        defaultValue: true
    },
    [UPDATE_INCLUDE_MISSING_WILL_IT_BLOW_ACTION_TYPE]: {
        field: 'includeMissingWillItBlow',
        converter: Boolean,
        defaultValue: true
    }
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
export const updateIncludeSausageDisqualifiedFilter = updateFilter(UPDATE_INCLUDE_SAUSAGE_DISQUALIFIED_ACTION_TYPE)
export const updateIncludeWillItBlowDisqualifiedFilter = updateFilter(UPDATE_INCLUDE_WILL_IT_BLOW_DISQUALIFIED_ACTION_TYPE)
export const updateIncludeMissingWillItBlowFilter = updateFilter(UPDATE_INCLUDE_MISSING_WILL_IT_BLOW_ACTION_TYPE)
export const resetFilters = { type: RESET_FILTERS_ACTION_TYPE }

const defaultFilterState = (() => Object.fromEntries(
    Object.values(UPDATE_FILTERS_ACTION_TYPES_AND_ATTRIBUTE)
    .map(({ field, defaultValue }) => [ field, defaultValue ])))()

const initialFilterState = (() => {
    const queryState = queryString.parse(window.location.search)
    const initialState = {
        ...defaultFilterState, 
        ...queryState
    }

    for(const fieldDef of Object.values(UPDATE_FILTERS_ACTION_TYPES_AND_ATTRIBUTE)) {
        if (! fieldDef.converter) {
            continue
        }
        initialState[fieldDef.field] = fieldDef.converter(initialState[fieldDef.field])
    }

    return initialState
})()

function filterReducer(state = initialFilterState, action) {
    const actionType = action.type
    if (actionType === RESET_FILTERS_ACTION_TYPE) {
        return defaultFilterState
    }
    const fieldDef = UPDATE_FILTERS_ACTION_TYPES_AND_ATTRIBUTE[actionType];
    if (fieldDef) {
        return { ...state, [fieldDef.field]: (fieldDef.converter || (val => val))(action.value) }
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
    .filter(sausage => {
        if (sausage.tags && sausage.tags.includes("sausage-disqualified")) return state.filters.includeSausageDisqualified
        return sausage.sausages >= state.filters.minSausages && sausage.sausages <= state.filters.maxSausages
    })
    .filter(sausage => {
        if (sausage.tags && sausage.tags.includes("will-it-blow-disqualified")) return state.filters.includeWillItBlowDisqualified
        if (state.filters.includeMissingWillItBlow && (! sausage.ruffalos)) return true
        return sausage.ruffalos >= state.filters.minRuffalos && sausage.ruffalos <= state.filters.maxRuffalos
    })

// TODO if this gets more complex then add https://redux.js.org/recipes/configuring-your-store#simplifying-setup-with-redux-toolkit