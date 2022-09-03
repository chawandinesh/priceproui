import React from 'react';
import { atnHideSnackbar } from 'redux/actions/snackbarActions';
import { Snackbar, useDispatch, useSelector, Alert } from 'utils/imports';

const SnackbarComponent = () => {
    const snackbar = useSelector((state) => state.snackbar);
    const dispatch = useDispatch();
    console.log(snackbar);
    const handleClose = () => {
        dispatch(atnHideSnackbar());
    };
    return (
        <Snackbar open={snackbar?.show} autoHideDuration={6000} onClose={handleClose}>
            <Alert variant="filled" onClose={handleClose} severity={snackbar?.snackbarType} sx={{ width: '100%' }}>
                {snackbar?.data}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarComponent;
