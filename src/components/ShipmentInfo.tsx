import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


interface ICargo {
    type: string;
    description: string;
    volume: string;
}

interface IService {
    type: string;
    value?: string;
}

interface AppState {
    id: string;
    name: string;
    cargo: ICargo[];
    mode: string;
    type: string;
    destination: string;
    origin: string;
    services: IService[];
    total: string;
    status: string;
    userId: string;
}

interface Props {
    selectedShipment: AppState;
    onEditName: (name: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin3: {
            margin: theme.spacing(3),
        },
        margin1: {
            margin: theme.spacing(1),
        },
        table: {
            minWidth: 650,
        },
        input: {
            minWidth: 300,
        }
    }),
);

export default function ShipmentInfo({ selectedShipment, onEditName }: Props) {

    const classes = useStyles();
    const [name, setName] = useState('');
    const [mode, setMode] = useState("show");

    function handleKeyDown(e:any) {
        if (e.key === 'Enter') {
            setMode("show");
            onEditName(name);
        }
    }

    const myInput = <input
        className={classes.input}
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={handleKeyDown}
    />;

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="left">name</TableCell>
                            <TableCell align="left">origin</TableCell>
                            <TableCell align="left">destination</TableCell>
                            <TableCell align="left">mode</TableCell>
                            <TableCell align="left">total</TableCell>
                            <TableCell align="left">status</TableCell>
                            <TableCell align="left">userId</TableCell>
                            <TableCell align="left">type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={selectedShipment.id}>
                            <TableCell component="th" scope="row">
                                {selectedShipment.id}
                            </TableCell>
                            <TableCell align="left">
                                {mode === "show" ?
                                    <label>
                                        {selectedShipment.name}
                                    </label>
                                    :
                                    myInput
                                }
                                <Button
                                    variant="contained"
                                    size="small"
                                    className={classes.margin1}
                                    onClick={() => {
                                        setMode("edit");
                                        setName(selectedShipment.name);
                                    }}
                                >
                                    edit
                                </Button>
                            </TableCell>
                            <TableCell align="left">{selectedShipment.origin}</TableCell>
                            <TableCell align="left">{selectedShipment.destination}</TableCell>
                            <TableCell align="left">{selectedShipment.mode}</TableCell>
                            <TableCell align="left">{selectedShipment.total}</TableCell>
                            <TableCell align="left">{selectedShipment.status}</TableCell>
                            <TableCell align="left">{selectedShipment.userId}</TableCell>
                            <TableCell align="left">{selectedShipment.type}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" size="large" className={classes.margin3}>
                <Link to='/'>
                    go to home
                </Link>
            </Button>
        </>
    );
}