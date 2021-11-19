import {Typography} from "@mui/material";
import {Box, Stack, Chip} from "@mui/material";
import {NATIONALITY_HUMAN_NAME} from "../../../constants/nationality";

const Nationalities = ({data}) => {
    const info = data.reduce((acc, el) => {
        acc[NATIONALITY_HUMAN_NAME[el.nat]] = (acc[NATIONALITY_HUMAN_NAME[el.nat]] || 0) + 1;
        return acc
    }, {})

    console.log(Object.entries(info))

    return (
        <Box>
            <Typography sx={{margin: '30px 0 15px 0'}} variant='h6'>Nationalities</Typography>
            <Stack  direction="row" spacing={1}>
                {Object.entries(info).map(([nat, quantity]) => <Chip label={`${nat} ${quantity}`} variant="filled" />)}
            </Stack>
        </Box>
    );
};

export default Nationalities;