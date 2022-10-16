import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'utils/constant';
import { getAllTrackingItems, isLogin } from 'api';
import { atnAllTrackingItemsActions } from 'redux/actions/allTrackingProductsActions';
import { _, useDispatch, useSelector, Box, isLoggedIn } from 'utils/imports';
import ProductCard from 'views/pages/home-search/ProductCard';
import { useNavigate } from 'react-router-dom';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
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

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    {_.size(allTrackingItems) ? (
                        allTrackingItems.map((each, idx) => (
                            <Grid item xs={12} sm={6} lg={3} key={idx}>
                                <ProductCard
                                    isDashboardItem={true}
                                    desc={'--'}
                                    image={each?.image}
                                    productName={each?.title}
                                    link={each?.link}
                                    rating={each?.rating}
                                    id={each?.id}
                                    price={each?.bestPrice}
                                    bestPrice={each?.bestPrice}
                                    initialPrice={each?.initialPrice}
                                    inStock={each?.inStock}
                                    store={_.get(each, 'store')}
                                    enableAddToTracking={false}
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
