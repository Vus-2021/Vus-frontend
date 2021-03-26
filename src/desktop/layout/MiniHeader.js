import React from 'react';
import { Box, Typography, IconButton } from '@material-ui/core';
import { Backspace } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const MiniHeader = props => {
    const { handleClose, headerText, height } = props;
    const headerHeight = height ? height : '40px';
    const classes = UseStyles();
    return (
        <Box height={headerHeight} className={classes.headerBox} width="380px">
            <Box width="33%">
                {handleClose && (
                    <IconButton color="inherit" onClick={handleClose}>
                        &nbsp;&nbsp;
                        <Backspace />
                    </IconButton>
                )}
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

const UseStyles = makeStyles(theme => ({
    headerBox: {
        backgroundColor: '#766767',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
    },
    headerTitle: {
        letterSpacing: '2px',
        fontSize: '18px',
    },
}));

export default MiniHeader;