import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({ theme }) => {
    return {
        container: {
            padding: 0,
            width: '100%',
            margin: '0 auto'
        }
    };
});
function Profile() {
    const theme = useTheme();
    const classes = useStyles();
    return (
        <Grid container spacing={3} className={classes.container}>
            <Grid item xs={12}>
                <Paper elevation={1} style={{ height: '80vh' }}>
                    <p>in progress</p>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Profile;
