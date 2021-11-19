import React from 'react';
import {format, parseISO} from "date-fns";

import {
    TableContainer,
    TableBody, Table,
    TableCell, TableHead,
    TableRow, Paper,
    Avatar, Typography
} from "@mui/material";
import {CopyToClipboard} from "../../../components/CopyToClipboard";
import {NATIONALITY_HUMAN_NAME} from "../../../constants/nationality";


export const ContactsTable = ({data}) => {
    return (
        <TableContainer component={Paper} data-testid="contacts-table-container">
            <Table sx={{minWidth: 650}} aria-label="contacts table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{width: '5%'}}>Avatar</TableCell>
                        <TableCell style={{width: '13%'}}>Full name</TableCell>
                        <TableCell style={{width: '17%'}}>Birthday</TableCell>
                        <TableCell style={{width: '17%'}}>Email</TableCell>
                        <TableCell style={{width: '17%'}}>Phone</TableCell>
                        <TableCell style={{width: '17%'}}>Location</TableCell>
                        <TableCell style={{width: '7%'}} align="right">Nationality</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((el) => (
                        <TableRow
                            key={el.login.uuid}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                <Avatar src={el.picture.thumbnail} alt='imgOfUser'/>
                            </TableCell>
                            <TableCell component="th" scope="row">{el.name.title}. {el.name.first} {el.name.last}</TableCell>
                            <TableCell component="th" scope="row">
                                <Typography>{format(parseISO(el.dob.date), "MM/dd/yyyy")}</Typography>
                                {el.dob.age} years
                            </TableCell>
                            <TableCell>
                                <CopyToClipboard text={el.email} />
                            </TableCell>
                            <TableCell>
                                <CopyToClipboard text={el.phone}/>
                            </TableCell>
                            <TableCell>{el.location.country} {el.location.city}</TableCell>
                            <TableCell>{NATIONALITY_HUMAN_NAME[el.nat]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

