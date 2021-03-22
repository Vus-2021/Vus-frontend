import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Backspace } from '@material-ui/icons';
import { createUseStyles } from 'react-jss';

const Header2 = props => {
    const { handleClose, headerText, height } = props;
    const headerHeight = height ? height : '6%';
    const classes = useStyles();
    return (
        <Box height={headerHeight} className={classes.headerBox}>
            <Box width="33%">
                &nbsp;&nbsp;
                <Backspace onClick={handleClose} />
            </Box>
            <Box width="33%">
                <Typography align="center" className={classes.headerTitle}>
                    {headerText}
                </Typography>
            </Box>
            <Box width="33%"></Box>
        </Box>
    );
};

const useStyles = createUseStyles({
    headerBox: {
        backgroundColor: '#E43131',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
    },
    headerTitle: {
        '&.MuiTypography-body1': {
            letterSpacing: '4px',
            fontSize: '17px',
        },
    },
});

export default Header2;