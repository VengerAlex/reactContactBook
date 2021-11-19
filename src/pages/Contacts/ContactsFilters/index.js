import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {NATIONALITY_HUMAN_NAME} from "../../../constants/nationality";
import ClearIcon from '@mui/icons-material/Clear';
import {memo} from "react";

const ContactsFilter = memo(({filters, updateFilter, clearFilters}) => {
    const handleChangeFilter = (event) => {
        updateFilter(event.target.name, event.target.value)
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box sx={{display: 'flex',alignItems: 'center'}}>
                <TextField
                    value={filters.fullname}
                    onChange={handleChangeFilter}
                    size='small'
                    name='fullname'
                    label="Full Name"
                    variant="outlined"/>
                <FormControl
                    sx={{m: 1, minWidth: 120}}
                    size="small" variant="outlined">
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                        name="gender"
                        label="gender"
                        value={filters.gender}
                        labelId="gender"
                        onChange={handleChangeFilter}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    sx={{m: 1, minWidth: 220}}
                    size="small" variant="outlined">
                    <InputLabel id="nationality">Nationality</InputLabel>
                    <Select
                        name="nationality"
                        label="nationality"
                        value={filters.nationality}
                        labelId="nationality"
                        onChange={handleChangeFilter}
                    >
                        <MenuItem value="all">All</MenuItem>
                        {Object.entries(NATIONALITY_HUMAN_NAME).map(([key, name]) => <MenuItem key={key} value={key}>{name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
            <Button
                onClick={clearFilters}
                color="inherit"
                size='small'><ClearIcon fontSize="small"/>Clear</Button>
        </Box>
        );
});

export default ContactsFilter;