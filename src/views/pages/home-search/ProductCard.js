import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Box, Rating, Tooltip } from '@mui/material';
import amzn from 'assets/images/stores/amzn.png';
import fpkrt from 'assets/images/stores/fpkrt.png';
import crma from 'assets/images/stores/crma.jpeg';
import { MdAddLocation } from 'react-icons/md';
import { addToTracking } from '../../../api';
import PriceTextPopover from './PriceTextPopover';

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
        position: 'relative'
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
        bottom: 10,
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
            return <img src={crma} alt={store} className={classes.storeImage} />;
        default:
            return null;
    }
};

export default function ProductCard({
    id,
    isDashboardItem = false,
    image = '/static/images/cards/contemplative-reptile.jpg',
    productName = 'Lizard',
    desc = 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    link,
    rating,
    price = 0,
    inStock,
    store,
    enableAddToTracking = false
}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleAddToTracking = async (event) => {
        // const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        // };
        // const data = {
        //     product_id: id,
        //     targetPrice: price
        // };
        // try {
        //     const response = await addToTracking(data);
        // } catch (err) {
        //     console.log(err);
        // }
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
                <Typography variant="body2" color="text.secondary">
                    {desc}
                </Typography>
                {!isDashboardItem && <Rating name="read-only" value={rating} precision={0.5} readOnly />}

                <Typography variant="body2" color={inStock ? 'green' : 'red'}>
                    {inStock ? 'In Stock' : 'Out Of Stock'}
                </Typography>
                <Typography variant="h2" margin="5px 0px" component="h2" className={isDashboardItem ? classes.priceBest : null}>
                    {price.toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'INR'
                    })}
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}
