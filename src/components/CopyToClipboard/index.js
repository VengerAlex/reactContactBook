import {useCallback, useState} from "react";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {Box, Button, Tooltip} from '@mui/material';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import useCopyToClipboard from 'react-use/lib/useCopyToClipboard'
import ClickAwayListener from '@mui/material/ClickAwayListener';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            cursor: "pointer",
        },
        svgImg: {
            marginRight: theme.spacing(1),
        },

    }));

const STATUS_COPY = {
    COPY: 'copy',
    COPIED: 'copied'
}
const TITLE_BY_STATUS = {
    [STATUS_COPY.COPY]: 'copy',
    [STATUS_COPY.COPIED]: 'copied'
}

export const CopyToClipboard = ({text}) => {
    const [, copyToClipboard] = useCopyToClipboard();
    const classes = useStyles();
    const [statusCopy, setStatusCopy] = useState(STATUS_COPY.COPY)


    const copyTextToClipboard = useCallback(() => {
        setStatusCopy(STATUS_COPY.COPIED)

        copyToClipboard(text)
    }, [copyToClipboard, text])
    const onMouseLeaveCopy = useCallback(() => {
        setStatusCopy(STATUS_COPY.COPY)
    }, [setStatusCopy])

    return (
        <ClickAwayListener onClickAway={onMouseLeaveCopy}>
            <Tooltip title={TITLE_BY_STATUS[statusCopy]} placement='top-start'>
                <Box
                    display='flex'
                    alignItems='center'
                    className={classes.root}
                    onClick={copyTextToClipboard}
                >
                    <Button color='inherit' size='small' variant='text'>
                        <ContentCopyIcon fontSize="small" className={classes.svgImg}/>
                        {text}
                    </Button>
                </Box>
            </Tooltip>
        </ClickAwayListener>
    );
};
