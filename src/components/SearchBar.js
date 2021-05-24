import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
    updateQueryFilter, 
    updateMinSausagesFilter, 
    updateMaxSausagesFilter, 
    updateMinRuffalosFilter, 
    updateMaxRuffalosFilter,
    resetFilters,
    selectFilters
} from '../store'

const ScoreInput = (props) => (<input type="number" max="5" min="0" {...props} />)

export default function SearchBar() {
    const filters = useSelector(selectFilters)
    const dispatch = useDispatch()
    const withUpdateEvent = (callback) => e => callback(e.target.value)
    const dispathValueChangeEventFor = (actionGenerator) => withUpdateEvent(val => dispatch(actionGenerator(val)))

    return (
        <div>
            <input type="text" placeholder="Search" value={filters.query} onChange={dispathValueChangeEventFor(updateQueryFilter)} />
            Sausages: <ScoreInput value={filters.minSausages} onChange={dispathValueChangeEventFor(updateMinSausagesFilter)} /> to 
            <ScoreInput value={filters.maxSausages} onChange={dispathValueChangeEventFor(updateMaxSausagesFilter)} />
            Ruffalos: <ScoreInput value={filters.minRuffalos} onChange={dispathValueChangeEventFor(updateMinRuffalosFilter)} /> to 
            <ScoreInput value={filters.maxRuffalos} onChange={dispathValueChangeEventFor(updateMaxRuffalosFilter)} />
            <input type="button" value="Reset" onClick={() => dispatch(resetFilters)} />
        </div>
    )
}