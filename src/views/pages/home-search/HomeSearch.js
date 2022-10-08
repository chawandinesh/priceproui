import { useState } from 'react';
import HomeWrapper from './HomeWrapper';
import { atnGetSearchResults } from 'redux/actions/searchActions';
import ProductCard from './ProductCard';
import { useDispatch, useSelector, makeStyles, Box, IconButton, CircularProgress, Grid, Search, _ } from 'utils/imports';
import { HistoryChart } from 'ui-component/components/HistoryChart';
import { Button, ButtonGroup } from '@mui/material';

const useStyles = makeStyles({
    priceProTitle: {
        padding: '10px 0px'
    },
    textFieldContainer: {
        margin: '20px 0px'
    },
    searchIcon: {
        position: 'absolute',
        top: '10%',
        left: '1%'
    },
    textField: {
        borderWidth: '0px',
        boxShadow: '0 1px 6px 0 rgba(32, 33, 36, .28)',
        width: '100%',
        padding: '0px 55px',
        outline: 'none',
        fontSize: '20px',
        height: '50px',
        borderRadius: 20
    },
    historyChartContainer: {
        marginTop: '50px'
    }
});

const HomeSearch = () => {
    const classes = useStyles();
    const [filterType, setFilterType] = useState('All');
    const dispatch = useDispatch();
    const search = useSelector((state) => state.search);
    const { searchResults, error, loading } = search;
    const [text, setText] = useState('');
    const handleChangeText = (e) => {
        setText(e.target.value);
    };

    const handleSearch = () => {
        dispatch(atnGetSearchResults(text));
    };

    const filters = [{ name: 'Monthly' }, { name: 'Yearly' }, { name: 'All' }];

    return (
        <HomeWrapper>
            <Grid container direction="column" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item xs={12} style={{ marginBottom: '50px' }}>
                            <Grid container justifyContent="center">
                                <Grid item xs={12} lg={6}>
                                    <Box position="relative" className={classes.textFieldContainer}>
                                        <input
                                            type="text"
                                            placeholder="Search with product title or product link"
                                            className={classes.textField}
                                            onChange={handleChangeText}
                                            onKeyDownCapture={(event) => {
                                                if (event.key === 'Enter') {
                                                    handleSearch();
                                                }
                                            }}
                                        />
                                        <IconButton className={classes.searchIcon} onClick={handleSearch}>
                                            <Search color="primary" />
                                        </IconButton>
                                    </Box>
                                    {/* <TextField
                                        fullWidth
                                        className={classes.textField}
                                        placeholder="Search Item"
                                        margin="normal"
                                        onChange={handleChangeText}
                                        onKeyDownCapture={(event) => {
                                            if (event.key === 'Enter') {
                                                handleSearch();
                                            }
                                        }}
                                        InputProps={{ autoFocus: true }}
                                        type="text"
                                        variant="outlined"
                                        defaultValue=""
                                    /> */}
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
                                [...searchResults].map((each, idx) => {
                                    return (
                                        <Grid item xs={12} sm={6} lg={3} key={idx}>
                                            <ProductCard
                                                desc={each?.storeProductID}
                                                image={each?.image}
                                                productName={each?.title}
                                                link={each?.link}
                                                rating={each?.rating}
                                                id={each?.id}
                                                price={each?.price}
                                                inStock={each?.inStock}
                                                store={_.get(each, 'store.name')}
                                                enableAddToTracking={true}
                                            />
                                        </Grid>
                                    );
                                })
                            )}
                        </Grid>
                        <Grid className={classes.historyChartContainer} maxWidth="md" container alignItems="center">
                            {/* <Box alignSelf="center" justifyContent="center" display="flex" width="100%" marginY="10px">
                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                    {filters.map((each) => (
                                        <Button
                                            variant={each.name === filterType ? 'contained' : 'outlined'}
                                            onClick={() => {
                                                setFilterType(each.name);
                                            }}
                                        >
                                            {each.name}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </Box> */}

                            <HistoryChart />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </HomeWrapper>
    );
};

export default HomeSearch;
