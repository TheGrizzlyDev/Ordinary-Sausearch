import React, { useState, useEffect } from 'react'
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
    selectFilters,
    selectResults
} from '../store'
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ShareIcon from '@material-ui/icons/Share';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FilterListIcon from '@material-ui/icons/FilterList';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import copy from 'copy-to-clipboard';
import Snackbar from '@material-ui/core/Snackbar';
import * as download from 'js-file-download'

function ButtonWithPopup({ renderButtonChildren, renderPopupChildren }) {
    const [open, setOpen] = useState(false);

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
                {renderPopupChildren(handleClose)}
            </Dialog>
        </>
    )
}

function ShareButton() {
    const [nativeShare, setNativeShare] = useState(false)
    useEffect(() => {
        setNativeShare(!!window.navigator.share)
    }, [])
    const [showCopiedBanner, setShowCopiedBanner] = useState(false)

    const handleClickOpen = () => {
        const url = window.location.href
        if (nativeShare) {
            navigator.share({
                title: 'Ordinary Sausearch',
                url
            }).catch(console.error)
            return
        }
        console.log(url)
        copy(url)
        setShowCopiedBanner(true)
    }

    return (
            <IconButton aria-label="delete" color="inherit" onClick={handleClickOpen}>
                <ShareIcon />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={showCopiedBanner}
                    autoHideDuration={4000}
                    onClose={() => setShowCopiedBanner(false)}
                    message="URL copied to your clipboard"
                />
            </IconButton>
    )

}

function DownloadButton() {
    const results = useSelector(selectResults)
    const [showCopiedBanner, setShowCopiedBanner] = useState(false)

    const handleClickOpen = () => {
        download(JSON.stringify(results), 'sausages.json')
        setShowCopiedBanner(true)
    }

    return (
            <IconButton aria-label="delete" color="inherit" onClick={handleClickOpen}>
                <DownloadIcon />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={showCopiedBanner}
                    autoHideDuration={4000}
                    onClose={() => setShowCopiedBanner(false)}
                    message="Search results downloaded"
                />
            </IconButton>
    )

}

const useStyles = makeStyles((theme) => ({
    logo: {
        border: '2px solid #20202050'
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        paddingLeft: '1em',
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
        height: `calc(56px + ${theme.spacing(2)}px)`
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
            <div className={classes.padding} />
            <AppBar position="fixed">
                <Toolbar>
                    <Avatar className={classes.logo} alt="Ordinary Sausage logo" src={process.env.PUBLIC_URL + "/logo.png"} />

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
                    <ButtonWithPopup
                        renderButtonChildren={() => (<FilterListIcon />)}
                        renderPopupChildren={close => (
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
                                <DialogActions>
                                    <Button onClick={() => {
                                        dispatch(resetFilters)
                                        close()
                                    }} color="primary">
                                        Reset
                                    </Button>
                                    <Button onClick={close} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </div>)}
                    />
                    <div className={classes.grow} />
                    <ShareButton />
                    <DownloadButton />
                </Toolbar>
            </AppBar>
        </div>
    );
}
