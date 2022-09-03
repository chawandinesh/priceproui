import { addToTracking } from 'api';
import React, { useState } from 'react';
import { atnShowSnackbar } from 'redux/actions/snackbarActions';
import { _, useDispatch, makeStyles, IconButton, useTheme, FaPlus, Box, TextField, Popover, CircularProgress } from 'utils/imports';

const useStyles = makeStyles({
    addIcon: {
        position: 'absolute',
        top: '20%',
        right: '5%',
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#fafafa'
        }
    },
    progress: {
        position: 'absolute',
        top: '30%',
        right: '6%',
        backgroundColor: '#fff'
    }
});

export default function PriceTextPopover({ anchorEl, setAnchorEl, productId }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [targetPrice, setTargetPrice] = useState(null);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleChangeTargetPrice = (e) => setTargetPrice(e.target.value);

    const handleAddTargetPrice = async () => {
        const data = {
            product_id: productId,
            targetPrice: targetPrice
        };
        setLoading(true);
        try {
            const response = await addToTracking(data);
            setLoading(false);
            setAnchorEl(null);
            dispatch(atnShowSnackbar('Successfully Added Target price', 'success'));
        } catch (err) {
            console.log(err.response.data.message);
            setLoading(false);
            dispatch(atnShowSnackbar(err.response.data.message, 'error'));
        }
    };
    return (
        <div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <Box position="relative" padding={1}>
                    <TextField
                        id="outlined-basic"
                        type="number"
                        value={targetPrice}
                        onChange={handleChangeTargetPrice}
                        label="Add Target Price"
                        variant="outlined"
                    />
                    {targetPrice && (
                        <>
                            {loading ? (
                                <Box className={classes.progress}>
                                    <CircularProgress size={25} />
                                </Box>
                            ) : (
                                <IconButton className={classes.addIcon} onClick={handleAddTargetPrice}>
                                    <FaPlus color={theme.palette.primary.main} />
                                </IconButton>
                            )}
                        </>
                    )}
                </Box>
            </Popover>
        </div>
    );
}
