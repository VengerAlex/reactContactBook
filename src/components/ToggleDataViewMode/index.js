import {useCallback} from "react";

import {ViewListOutlined, ViewModule} from "@mui/icons-material";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {DATA_VIEW_MODES} from "../../pages/Contacts/ContactsTable/constants";

export const ToggleDataViewMode = ({setDataViewMode, dataViewMode}) => {
    const handleViewChange = useCallback((_, nextView) => {
        setDataViewMode(nextView)
    }, [setDataViewMode])

    return (
        <ToggleButtonGroup
            value={dataViewMode}
            onChange={handleViewChange}
            orientation="horizontal"
            exclusive
        >
            <ToggleButton
                value={DATA_VIEW_MODES.TABLE}
                aria-label={DATA_VIEW_MODES.TABLE}>
                <ViewListOutlined/>
            </ToggleButton>
            <ToggleButton
                value={DATA_VIEW_MODES.GRID}
                aria-label={DATA_VIEW_MODES.GRID}>
                <ViewModule/>
            </ToggleButton>
        </ToggleButtonGroup>
    );
};
