import { useEffect, useState } from 'react';

// material-ui
import { Grid, useMediaQuery, useTheme } from '@mui/material';
// project imports
import { gridSpacing } from 'utils/constant';
import { isLogin } from 'api';
import { atnAllTrackingItemsActions } from 'redux/actions/allTrackingProductsActions';
import { _, useDispatch, useSelector, Box, isLoggedIn, makeStyles } from 'utils/imports';
import ProductCard from 'views/pages/home-search/ProductCard';
import { useNavigate } from 'react-router-dom';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const allTrackingItems = useSelector((state) => _.get(state, 'allTrackingItems.trackingItems'));

    useEffect(() => {
        if (isLogin()) {
            dispatch(atnAllTrackingItemsActions());
            setLoading(false);
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate]);
    const matches = useMediaQuery('(min-width:600px)');

    return (
        <Grid container spacing={gridSpacing} style={{ margin: matches ? 5 : 0 }}>
            <Grid xs={12}>
                <Grid container spacing={gridSpacing}>
                    {_.size(allTrackingItems) ? (
                        allTrackingItems.map((each, idx) => (
                            <Grid item xs={12} sm={6} lg={3} key={idx}>
                                <ProductCard
                                    image={each?.image}
                                    productName={each?.title}
                                    link={each?.link}
                                    id={each?.id}
                                    price={_.parseInt(each?.bestPrice)}
                                    inStock={each?.inStock}
                                    store={_.get(each, 'store.name')}
                                    currentPrice={_.parseInt(_.get(each, 'initialPrice'))}
                                    targetPrice={_.parseInt(_.get(each, 'targetPrice'))}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Box textAlign="center" width="100%">
                            <h3>No Items Found</h3>
                        </Box>
                    )}
                    {/* <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Grid>
            </Grid>
            {/* <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid> */}
        </Grid>
    );
};

export default Dashboard;
