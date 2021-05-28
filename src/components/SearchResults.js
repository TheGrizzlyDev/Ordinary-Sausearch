import { useSelector } from 'react-redux'
import { selectResults } from '../store'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableRow: {
        height: 64,
    }
});

const ratingComponentGenerator = (img) => ({rating}) => {
    const iconSize = 24
    const rest = rating % 1
    return (
        <span>
            {(!! rating) && new Array(parseInt(rating)).fill().map(() => <img width={iconSize} src={img}/>) }
            {(rest > 0) && <img width={iconSize} height={Math.round(iconSize * rest)} src={img} style={{
                objectFit: 'cover',
                objectPosition: '0% 100%'
            }}/>}
        </span>
    )
}

const SausageRating = ratingComponentGenerator(`${process.env.PUBLIC_URL}/sausage.png`)

const RuffaloRating = ratingComponentGenerator(`${process.env.PUBLIC_URL}/ruffalo.png`)

export default function SearchResults() {
    const results = useSelector(selectResults)
    const classes = useStyles();

    return (

        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Sausages</TableCell>
                        <TableCell align="right">Ruffalos</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.map((row) => (
                        <TableRow className={classes.tableRow} key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                                <SausageRating rating={row.sausages}/>
                            </TableCell>
                            <TableCell align="right">
                                <RuffaloRating rating={row.ruffalos}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}