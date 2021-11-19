import {useCallback, useState} from "react";

import {useContacts} from "../../customHooks/useContacts";
import {ContactsTable} from "./ContactsTable";
import {
    Grid, Container,
    Typography, CircularProgress,
    Box, Paper
} from "@mui/material";
import {makeStyles, createStyles} from '@material-ui/core/styles';
import {ToggleDataViewMode} from "../../components/ToggleDataViewMode";
import {DATA_VIEW_MODES} from "./ContactsTable/constants";
import {useDataViewMode} from "../../customHooks/useDataViewMode";
import ContactsFilter from "./ContactsFilters";
import Statistics from "./Statistic";
import Nationalities from "./Nationalities";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(4)
        },
        headContainer: {
            marginBottom: theme.spacing(3)
        },
        filtersContainer: {
            marginBottom: theme.spacing(3)
        }
    }));


const FiltersDefaultValue = {
    fullname: "",
    gender: "all",
    nationality: "all"
}

const filterByFullName = ({first = "", last = ""}, fullname) => (
    first.toLowerCase().includes(fullname.toLowerCase()) ||
    last.toLowerCase().includes(fullname.toLowerCase())
)
const filterBySelect = (value, gender) => {
    if (gender === "all") {
        return true
    }
    return value === gender
}
const filterByNationality = (value, nationality) => {
    if (nationality === "all") {
        return true
    }
    return value === nationality
}


export const Contacts = () => {
    const classes = useStyles();
    const {data, isLoading, isError} = useContacts()
    const [dataViewMode, setDataViewMode] = useDataViewMode()
    const [filters, setFilters] = useState(FiltersDefaultValue)

    const updateFilter = useCallback((name, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }))
    }, [])

    const clearFilters = useCallback(() => {
        setFilters(FiltersDefaultValue)
    }, [])

    const filteredContacts = data
        .filter(el => filterByFullName(el.name, filters.fullname))
        .filter(el => filterBySelect(el.gender, filters.gender))
        .filter(el => filterByNationality(el.nat, filters.nationality))

    const getQuantityOf = () => {
        let male = 0;
        let female = 0;

        filteredContacts.forEach(el => {
            if(el.gender === "male"){
                male++;
            }else if(el.gender === "female"){
                female++
            }
        })

        return [male, female]
    }

    return (
        <Container
            className={classes.root}
            maxWidth='xl'>
            <Grid
                className={classes.filtersContainer}
                container spacing={3}>
                <Grid item xs={12}>
                    <ContactsFilter
                        updateFilter={updateFilter}
                        filters={filters}
                        clearFilters={clearFilters}
                    />
                </Grid>
            </Grid>
            <Grid
                className={classes.headContainer}
                container spacing={3}>
                <Grid item xs={12}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant='h5' component='h1'>
                            Contacts
                        </Typography>
                        <ToggleDataViewMode
                            dataViewMode={dataViewMode}
                            setDataViewMode={setDataViewMode}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    {(() => {
                        if (isLoading) return <div><CircularProgress data-testid="contacts-loader"/></div>
                        if (isError) return <div data-testid="contacts-error">...error</div>

                        if (dataViewMode === DATA_VIEW_MODES.TABLE) {
                            return <ContactsTable data={filteredContacts}/>
                        }
                        if (dataViewMode === DATA_VIEW_MODES.GRID) {
                            return "grid"
                        }
                        return null
                    })()}
                </Grid>
            </Grid>
            <Paper sx={{marginBottom: '100px', paddingBottom: '20px'}}>
                <Typography variant='h4'>Statistic</Typography>
                <Statistics
                    getQuantityOf={getQuantityOf}
                    size={filteredContacts.length} />
                <Nationalities data={filteredContacts}/>
            </Paper>
        </Container>
    );
};

