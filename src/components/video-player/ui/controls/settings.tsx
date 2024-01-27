// UI-libs
import { IconButton } from '@mui/material';

// Insides
import { miniButtonStyles } from './styles'

// Assets
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

export default function Settings() {
    return (
        <IconButton>
            <SettingsRoundedIcon sx={miniButtonStyles} />
        </IconButton>
    )
}