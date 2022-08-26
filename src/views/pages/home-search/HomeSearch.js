import { useState } from 'react';
import { Search } from '@mui/icons-material';
import { CircularProgress, Grid, IconButton, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomeWrapper from './HomeWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { atnGetSearchResults } from 'redux/actions/searchActions';
import ProductCard from './ProductCard';
import _ from 'lodash';
const useStyles = makeStyles({
    priceProTitle: {
        padding: '10px 0px'
    },
    textFieldContainer: {
        position: 'relative',
        margin: '20px 0px'
    },
    searchIcon: {
        position: 'absolute',
        top: '30%',
        right: '1%'
    }
});

const HomeSearch = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const search = useSelector((state) => state.search);
    const { searchResults, error, loading } = search;
    const [text, setText] = useState('');
    console.log(searchResults);
    const handleChangeText = (e) => {
        setText(e.target.value);
    };

    const handleSearch = () => {
        dispatch(atnGetSearchResults(text));
    };

    return (
        <HomeWrapper>
            <Grid container direction="column" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            <Grid container justifyContent="center">
                                <Grid item xs={12} lg={6} className={classes.textFieldContainer}>
                                    <TextField
                                        fullWidth
                                        placeholder="Search Item"
                                        margin="normal"
                                        onChange={handleChangeText}
                                        name="fname"
                                        onKeyDownCapture={(event) => {
                                            console.log(event.key);
                                            if (event.key === 'Enter') {
                                                handleSearch();
                                            }
                                        }}
                                        type="text"
                                        variant="outlined"
                                        defaultValue=""
                                    />
                                    <IconButton className={classes.searchIcon} onClick={handleSearch}>
                                        <Search color="primary" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid maxWidth="lg" container alignItems="center" spacing={3}>
                            {loading ? (
                                <Grid item xs={12}>
                                    <Grid container justifyContent="center">
                                        <Grid item>
                                            <CircularProgress />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ) : error ? (
                                <p>Something went wrong</p>
                            ) : (
                                [...searchResults].map((each, idx) => (
                                    <Grid item xs={12} sm={6} lg={3} key={idx}>
                                        <ProductCard
                                            desc={each?.storeProductID}
                                            image={each?.image}
                                            productName={each?.title}
                                            link={each?.link}
                                            rating={each?.rating}
                                            price={each?.price}
                                            inStock={each?.inStock}
                                            store={_.get(each, 'store.name')}
                                        />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </HomeWrapper>
    );
};

export default HomeSearch;
