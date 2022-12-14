import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Box, Rating, Tooltip, Grid } from '@mui/material';
import amzn from 'assets/images/stores/amzn.png';
import fpkrt from 'assets/images/stores/fpkrt.png';
import crma from 'assets/images/stores/crma.png';
import { MdAddLocation } from 'react-icons/md';
import PriceTextPopover from './PriceTextPopover';
import PropTypes from 'prop-types';
import { isLoggedIn } from 'utils/imports';
import { isLogin } from 'api';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { dialogActions } from 'redux/actions/dialogActions/index';
const useStyles = makeStyles((theme) => ({
    imageStyles: {
        objectFit: 'contain',
        padding: '10px'
    },
    productName: {
        color: theme.palette.primary.main,
        '&:hover': {
            opacity: 0.5,
            cursor: 'pointer'
        }
    },
    card: {
        position: 'relative',
        margin: '0 auto'
    },
    storeImage: {
        height: '30px',
        width: '30px',
        position: 'absolute',
        top: 5,
        objectFit: 'cover',
        left: 5
    },
    addToTracking: {
        position: 'absolute',
        bottom: 30,
        right: 10,
        fontSize: '30px',
        cursor: 'pointer',
        color: theme.palette.primary.main,
        transition: 'font-size .5s',
        '&:hover': {
            fontSize: '40px',
            transition: 'font-size .5s'
        }
    },
    priceBest: {
        color: '#00b300'
    },
    currentPrice: {
        color: '#000',
        textDecoration: 'line-through'
    },
    chromaImage: {
        height: '23px',
        width: '23px',
        position: 'absolute',
        top: 7,
        objectFit: 'cover',
        left: 7
    }
}));

const StoreImg = ({ store }) => {
    const classes = useStyles();
    switch (store) {
        case 'AMZN':
            return <img src={amzn} alt={store} className={classes.storeImage} />;
        case 'FPKT':
            return <img src={fpkrt} alt={store} className={classes.storeImage} />;
        case 'CRMA':
            return <img src={crma} alt={store} className={classes.chromaImage} />;
        default:
            return null;
    }
};

export default function ProductCard({
    id,
    image = '/static/images/cards/contemplative-reptile.jpg',
    productName = 'Lizard',
    desc,
    link,
    rating,
    price = 0,
    inStock,
    currentPrice = null,
    store,
    targetPrice,
    enableAddToTracking = false
}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleAddToTracking = async (event) => {
        if (isLogin()) {
            setAnchorEl(event.currentTarget);
        } else {
            dispatch(dialogActions.atnShowDialog('loginRequired', navigate, 'Login Required', 'Please login to track products'));
        }
    };

    return (
        <Card elevation={1} className={classes.card} sx={{ maxWidth: 345, minHeight: 280 }}>
            <StoreImg store={store} />
            <PriceTextPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} productId={id} />

            {enableAddToTracking && (
                <Tooltip title="Add to tracking">
                    <Box className={classes.addToTracking}>
                        <MdAddLocation onClick={handleAddToTracking} />
                    </Box>
                </Tooltip>
            )}

            <CardMedia component="img" className={classes.imageStyles} height="180" image={image} alt="green iguana" />
            <CardContent>
                {productName && (
                    <Typography
                        gutterBottom
                        className={classes.productName}
                        variant="h5"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden"
                        component="div"
                        onClick={() => window.open(link, '_blank')}
                    >
                        {productName}
                    </Typography>
                )}

                {desc && (
                    <Typography variant="body2" color="text.secondary">
                        {desc}
                    </Typography>
                )}

                {rating && <Rating name="read-only" value={rating} precision={0.5} readOnly />}

                <Typography variant="body2" color={inStock ? 'green' : 'red'}>
                    {inStock ? 'In Stock' : 'Out Of Stock'}
                </Typography>
                <Grid>
                    <Typography variant="h2" margin="5px 0px" component="h2">
                        {price.toLocaleString('en-IN', {
                            maximumFractionDigits: 2,
                            style: 'currency',
                            currency: 'INR'
                        })}
                    </Typography>
                    {currentPrice && currentPrice !== price && (
                        <Typography variant="p" margin="5px 0px" component="h4" style={{ textDecoration: 'line-through' }}>
                            {currentPrice.toLocaleString('en-IN', {
                                maximumFractionDigits: 2,
                                style: 'currency',
                                currency: 'INR'
                            })}
                        </Typography>
                    )}
                </Grid>
                <Grid container spacing={2}>
                    <Grid item>
                        {targetPrice && targetPrice !== price && (
                            <Typography variant="subtitle1" margin="5px 0px 2px 0px" component="p" color="green">
                                <span style={{ color: 'black' }}> Target Price: </span>
                                {targetPrice.toLocaleString('en-IN', {
                                    maximumFractionDigits: 2,
                                    style: 'currency',
                                    currency: 'INR'
                                })}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

ProductCard.propTypes = {
    id: PropTypes.number,
    isDashboardItem: PropTypes.bool,
    image: PropTypes.string,
    productName: PropTypes.string,
    desc: PropTypes.string,
    link: PropTypes.string,
    rating: PropTypes.string,
    price: PropTypes.number,
    inStock: PropTypes.bool,
    store: PropTypes.string,
    enableAddToTracking: PropTypes.bool,
    currentPrice: PropTypes.any,
    targetPrice: PropTypes.any
};

StoreImg.propTypes = {
    store: PropTypes.string
};
