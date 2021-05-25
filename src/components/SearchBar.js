import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    updateQueryFilter,
    updateMinSausagesFilter,
    updateMaxSausagesFilter,
    updateMinRuffalosFilter,
    updateMaxRuffalosFilter,
    updateIncludeSausageDisqualifiedFilter,
    updateIncludeWillItBlowDisqualifiedFilter,
    updateIncludeMissingWillItBlowFilter,
    resetFilters,
    selectFilters
} from '../store'
import styles from './SearchBar.module.css'

const ScoreInput = (props) => (<input type="number" max="5" min="0" {...props} />)

const FilteringOptions = ({ filters, dispathValueChangeEventFor }) => {
    return (
        <div className={styles.SearchBarFilteringContainer}>
            <div>
                Sausages: <ScoreInput value={filters.minSausages} onChange={dispathValueChangeEventFor(updateMinSausagesFilter)} /> to
                <ScoreInput value={filters.maxSausages} onChange={dispathValueChangeEventFor(updateMaxSausagesFilter)} />
            </div>

            <span>Include disqualified <input type='checkbox'/></span>
            
            <div>
                Ruffalos: <ScoreInput value={filters.minRuffalos} onChange={dispathValueChangeEventFor(updateMinRuffalosFilter)} /> to
                <ScoreInput value={filters.maxRuffalos} onChange={dispathValueChangeEventFor(updateMaxRuffalosFilter)} />
            </div>
        </div>
    )
}

const SearchBar = () => {
    const filters = useSelector(selectFilters)
    const dispatch = useDispatch()
    const withUpdateEvent = (callback) => e => callback(e.target.value) && console.log(e.target.value)
    const dispathValueChangeEventFor = (actionGenerator) => withUpdateEvent(val => dispatch(actionGenerator(val)))
    const [visible, setVisible] = useState(false)

    return (
        <div className={styles.SearchBarContainer}>
            <input type="text" placeholder="Search" value={filters.query} onChange={dispathValueChangeEventFor(updateQueryFilter)} />

            <>
                <button onClick={() => setVisible(!visible)}>Show { visible ? 'Less' : 'More' }</button>
                {visible && <FilteringOptions filters={filters} dispathValueChangeEventFor={dispathValueChangeEventFor} />}
            </>

            <input type="button" value="Reset" onClick={() => dispatch(resetFilters)} />
        </div>
    )
}

export default SearchBar