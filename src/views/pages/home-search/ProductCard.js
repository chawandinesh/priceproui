import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Rating } from '@mui/material';
import amzn from 'assets/images/stores/amzn.png';
import fpkrt from 'assets/images/stores/fpkrt.png';
import crma from 'assets/images/stores/crma.jpeg';

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
    image = '/static/images/cards/contemplative-reptile.jpg',
    productName = 'Lizard',
    desc = 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    link,
    rating,
    price,
    inStock,
    store
}) {
    const classes = useStyles();

    return (
        <Card elevation={1} className={classes.card} sx={{ maxWidth: 345, minHeight: 280 }}>
            <StoreImg store={store} />
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
                <Rating name="read-only" value={rating} precision={0.5} readOnly />
                <Typography variant="body2" color={inStock ? 'green' : 'red'}>
                    {inStock ? 'In Stock' : 'Out Of Stock'}
                </Typography>
                <Typography variant="h2" margin="5px 0px" component="h2">
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
