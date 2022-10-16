import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { dialogActions } from 'redux/actions/dialogActions/index';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogComponent() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { title, show, desc, closeBtnText, okBtnText, hideClose, hideOpen } = _.get(state, 'dialog');
    const onClose = () => {
        dispatch(dialogActions.atnCloseDialog());
    };
    const onOk = () => {
        dispatch(dialogActions.atnOnOk());
    };
    return (
        <>
            <Dialog
                open={show}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle fontSize={20}>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">{desc}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {!hideClose && <Button onClick={onClose}>{closeBtnText}</Button>}
                    {!hideOpen && <Button onClick={onOk}>{okBtnText}</Button>}
                </DialogActions>
            </Dialog>
        </>
    );
}

DialogComponent.propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool,
    onClose: PropTypes.any,
    desc: PropTypes.string,
    closeBtnText: PropTypes.string,
    okBtnText: PropTypes.string,
    hideClose: PropTypes.bool,
    hideOpen: PropTypes.bool,
    onOk: PropTypes.any
};
