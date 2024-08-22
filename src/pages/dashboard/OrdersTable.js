import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party

// project import
import Dot from 'components/@extended/Dot';
//
import computer from 'assets/images/users/computer.png';
import { Grid } from '../../../node_modules/@mui/material/index';
function createData(id, picture, Asset, purchased, status, price, type, brand, employee, location) {
    return { id, picture, Asset, purchased, status, price, type, brand, employee, location };
}

const rows = [
    createData('#1', computer, 'Laptop', '2May, 2023', 'Action', 'Rs.60,000', '-', 'sony', 'Hussain', 'cuddalore'),
    createData('#2', computer, 'Laptop', '2May, 2023', 'Action', 'Rs.60,000', '-', 'sony', 'Hussain', 'cuddalore'),
    createData('#3', computer, 'Laptop', '2May, 2023', 'Action', 'Rs.60,000', '-', 'sony', 'Hussain', 'cuddalore')
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'id',
        align: 'center',
        disablePadding: false,
        label: 'ID'
    },
    {
        id: 'picture',
        align: 'center',
        disablePadding: true,
        label: 'Picture'
    },
    {
        id: 'asset ',
        align: 'center',
        disablePadding: false,
        label: 'Asset Details'
    },
    {
        id: 'purchased ',
        align: 'center',
        disablePadding: false,

        label: 'Purchased Date'
    },
    {
        id: 'status',
        align: 'center',
        disablePadding: false,
        label: 'Status'
    },
    {
        id: 'price',
        align: 'center',
        disablePadding: false,
        label: 'Price'
    },
    {
        id: 'type',
        align: 'center',
        disablePadding: false,
        label: 'Type'
    },
    {
        id: 'brand',
        align: 'center',
        disablePadding: false,
        label: 'Brand'
    },
    {
        id: 'employee',
        align: 'center',
        disablePadding: false,
        label: 'Employee'
    },
    {
        id: 'location',
        align: 'center',
        disablePadding: false,
        label: 'Location'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{ color: '#919EAB' }}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Pending';
            break;
        case 1:
            color = 'success';
            title = 'Approved';
            break;
        case 2:
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
    const [order] = useState('asc');
    const [orderBy] = useState('id');
    const [selected] = useState([]);

    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-of-type': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-of-type': {
                            pr: 3
                        }
                    }}
                >
                    <OrderTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                >
                                    <TableCell component="th" id={labelId} scope="row" align="center">
                                        <Link
                                            color="secondary"
                                            component={RouterLink}
                                            to=""
                                            sx={{ color: '#000000', fontSize: '16px', fontWeight: '500' }}
                                        >
                                            {row.id}
                                        </Link>
                                    </TableCell>

                                    <TableCell
                                        align="center"
                                        sx={{ color: '#000000', fontSize: '16px', fontWeight: '500', width: '30px', height: '20px' }}
                                    >
                                        {/* {row.picture} */}
                                        <img style={{ width: '40px', height: '40px' }} src={row.picture} alt={row.picture} />
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: '#000000', fontSize: '16px', fontWeight: '500' }}>
                                        {row.Asset}
                                    </TableCell>

                                    <TableCell align="center" sx={{ color: '#000000', fontSize: '16px', fontWeight: '500' }}>
                                        {row.purchased}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: '#000000', fontSize: '16px', fontWeight: '500' }}>
                                        <Grid sx={{ display: 'flex' }}>
                                            <Grid
                                                sx={{
                                                    width: '10px',
                                                    height: '10px',
                                                    bgcolor: '#17D307',
                                                    borderRadius: '100px',
                                                    mr: 0.4,
                                                    mt: 0.8
                                                }}
                                            ></Grid>
                                            <Grid>{row.status}</Grid>
                                        </Grid>
                                    </TableCell>

                                    <TableCell align="center" sx={{ color: '#000000', fontSize: '16px', fontWeight: '500' }}>
                                        {row.price}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: '#000000', fontSize: '16px', fontWeight: '500' }}>
                                        {row.type}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: '#000000', fontSize: '16px', fontWeight: '500' }}>
                                        {row.brand}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: '#000000', fontSize: '16px', fontWeight: '500' }}>
                                        {row.employee}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: '#000000', fontSize: '16px', fontWeight: '600' }}>
                                        {row.location}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
