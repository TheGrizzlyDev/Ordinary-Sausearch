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
import AccordionSummary from '@material-ui/core/AccordionSummary';
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
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import Popover from '@material-ui/core/Popover';

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
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <IconButton aria-label="delete" color="inherit" onClick={handleClick}>
                {renderButtonChildren()}
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {renderPopoverChildren()}
            </Popover>
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
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
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
    }
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const filters = useSelector(selectFilters)
    const dispatch = useDispatch()
    const withUpdateEvent = (callback) => e => callback(e.target.value) && console.log(e.target.value)
    const dispathValueChangeEventFor = (actionGenerator) => withUpdateEvent(val => dispatch(actionGenerator(val)))

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
                    <div className={classes.grow} />
                    <ButtonWithPopover
                        renderButtonChildren={() => (<FilterListIcon />)}
                        renderPopoverChildren={() => (<>
                            <Typography className={classes.typography}>The content of the Popover.</Typography>
                        </>)}
                    />
                </Toolbar>
            </AppBar>
        </div>
    );
}
