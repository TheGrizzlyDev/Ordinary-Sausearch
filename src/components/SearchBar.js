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
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import FormGroup from '@material-ui/core/FormGroup';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import Dialog from '@material-ui/core/Dialog';
import Slider from '@material-ui/core/Slider';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ScoreInput = (props) => (<input type="number" max="5" min="0" {...props} />)

// export default function SearchBar() {


//     return (
//         <div>
//             <input type="text" placeholder="Search" value={filters.query} onChange={dispathValueChangeEventFor(updateQueryFilter)} />
//             Sausages: <ScoreInput value={filters.minSausages} onChange={dispathValueChangeEventFor(updateMinSausagesFilter)} /> to 
//             <ScoreInput value={filters.maxSausages} onChange={dispathValueChangeEventFor(updateMaxSausagesFilter)} /> (
//             Include disqualified - checkbox placeholder -)
//             Ruffalos: <ScoreInput value={filters.minRuffalos} onChange={dispathValueChangeEventFor(updateMinRuffalosFilter)} /> to 
//             <ScoreInput value={filters.maxRuffalos} onChange={dispathValueChangeEventFor(updateMaxRuffalosFilter)} />
//             <input type="button" value="Reset" onClick={() => dispatch(resetFilters)} />
//         </div>
//     )
// }


function ButtonWithPopover({ renderButtonChildren, renderPopoverChildren }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <IconButton aria-label="delete" color="inherit" onClick={handleClickOpen}>
                {renderButtonChildren()}
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                {renderPopoverChildren()}
            </Dialog>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadContainer
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    padding: {
        height: `calc(56px * 2 + ${theme.spacing(2)}px)`
    },
    filterBox: {
        padding: '20px',
    }
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const filters = useSelector(selectFilters)
    const dispatch = useDispatch()
    const withUpdateEvent = (attr, callback) => e => callback(e.target[attr])
    const dispathValueChangeEventFor = (actionGenerator, attr = 'value') => withUpdateEvent(attr, val => dispatch(actionGenerator(val)))
    const dispathCheckboxChangeEventFor = (actionGenerator) => dispathValueChangeEventFor(actionGenerator, 'checked')

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Ordinary Sausearch
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={filters.query}
                            onChange={dispathValueChangeEventFor(updateQueryFilter)}
                        />
                    </div>
                    <ButtonWithPopover
                        renderButtonChildren={() => (<FilterListIcon />)}
                        renderPopoverChildren={() => (
                            <div classes={classes.filterBox}>
                                <DialogTitle>Advanced filters</DialogTitle>
                                <DialogContent>
                                    <FormGroup column>
                                        <TextField
                                            label="Min sausage score"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={filters.minSausages}
                                            onChange={dispathValueChangeEventFor(updateMinSausagesFilter)}
                                        />
                                        <TextField
                                            label="Max sausage score"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={filters.maxSausages}
                                            onChange={dispathValueChangeEventFor(updateMaxSausagesFilter)}
                                        />
                                        <TextField
                                            label="Min Ruffalos score"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={filters.minRuffalos}
                                            onChange={dispathValueChangeEventFor(updateMinRuffalosFilter)}
                                        />
                                        <TextField
                                            label="Max Ruffalos score"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={filters.maxRuffalos}
                                            onChange={dispathValueChangeEventFor(updateMaxRuffalosFilter)}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={filters.includeSausageDisqualified}
                                                    onChange={dispathCheckboxChangeEventFor(updateIncludeSausageDisqualifiedFilter)}
                                                    color="primary"
                                                />
                                            }
                                            label="Show disqualified sausages"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={filters.includeWillItBlowDisqualified}
                                                    onChange={dispathCheckboxChangeEventFor(updateIncludeWillItBlowDisqualifiedFilter)}
                                                    color="primary"
                                                />
                                            }
                                            label="Show disqualified 'Will it blow?'"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={filters.includeMissingWillItBlow}
                                                    onChange={dispathCheckboxChangeEventFor(updateIncludeMissingWillItBlowFilter)}
                                                    color="primary"
                                                />
                                            }
                                            label="Show missing 'Will it blow?'"
                                        />
                                    </FormGroup>
                                </DialogContent>
                            </div>)}
                    />
                    <div className={classes.grow} />
                </Toolbar>
            </AppBar>
        </div>
    );
}
