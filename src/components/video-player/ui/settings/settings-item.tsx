// Basics
import { ReactNode, memo } from 'react';

// UI-libs
import { MenuItem, MenuItemProps, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';

// Interfaces
export interface SettingsItemProps extends MenuItemProps {
    icon: ReactNode;
    label: string;
    option: ReactNode;
};

// Styled
export const MenuItemTitle = styled(Typography)`
    font-size: 16px;
    font-weight: 500;
    margin-left: 12px;
`;


function SettingsItem({ icon, label, option, ...props }: SettingsItemProps) {

    return (
        <MenuItem sx={{ minWidth: '260px', justifyContent: 'space-between' }} {...props}>
            <Stack direction="row" alignItems="center">
                {icon}
                <MenuItemTitle>{label}</MenuItemTitle>
            </Stack>
            <Stack>
                {option}
            </Stack>
        </MenuItem>
    )

};

export default memo(SettingsItem);