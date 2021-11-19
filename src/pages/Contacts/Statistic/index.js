import {
    Paper, Table, TableBody,
    TableCell, TableHead,
    TableRow, TableContainer, Alert
} from "@mui/material";



const Statistics = ({size, getQuantityOf}) => {
    const [male, female] = getQuantityOf();

    return (
        <>
        <TableContainer sx={{marginTop: '20px'}} component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell width='100px' align="left">Collection size</TableCell>
                        <TableCell width='100px' align="left">Males</TableCell>
                        <TableCell width='100px' align="left">Females</TableCell>
                        <TableCell align="left">Indeterminate</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell align="left">{size}</TableCell>
                        <TableCell align="left">{male}</TableCell>
                        <TableCell align="left">{female}</TableCell>
                        <TableCell align="left">0</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
            {
                male !== female &&  <Alert severity="info">{male > female ? 'men predominate' : 'female predominate'}</Alert>
            }
        </>
    );
};

export default Statistics;