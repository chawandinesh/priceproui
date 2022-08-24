import { Search } from '@mui/icons-material';
import { Grid, IconButton, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomeWrapper from './HomeWrapper';

const useStyles = makeStyles({
    priceProTitle: {
        padding: '10px 0px'
    },
    textFieldContainer: {
        position: 'relative'
    },
    searchIcon: {
        position: 'absolute',
        top: '30%',
        right: '1%'
    }
});

const HomeSearch = () => {
    const classes = useStyles();

    return (
        <HomeWrapper>
            <Grid container direction="column" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm={6} className={classes.textFieldContainer}>
                            <TextField
                                fullWidth
                                placeholder="Search Item"
                                margin="normal"
                                name="fname"
                                type="text"
                                variant="outlined"
                                defaultValue=""
                            />
                            <IconButton className={classes.searchIcon}>
                                <Search color="primary" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </HomeWrapper>
    );
};

export default HomeSearch;
