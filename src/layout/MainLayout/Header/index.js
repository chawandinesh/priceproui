import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, ButtonBase } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

// assets
import { IconMenu2 } from '@tabler/icons';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const useStyles = makeStyles({
    authButton: {
        margin: '5px'
    }
});

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const AuthButtons = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    return (
        <Box justifyContent="space-between" display="flex">
            <Button color="primary" variant="contained" className={classes.authButton} onClick={() => navigate('/login')}>
                Login
            </Button>
            <Button color="primary" variant="outlined" className={classes.authButton} onClick={() => navigate('/register')}>
                Register
            </Button>
        </Box>
    );
};

const Header = ({ handleLeftDrawerToggle, showToggle = true, showSearchBar = true, title = 'PricePro', showNotification = true }) => {
    const loginDetails = useSelector((state) => _.get(state, 'login', ''));
    const theme = useTheme();
    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection title={title} showToggle={showToggle} />
                </Box>
                {showToggle ? (
                    <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.secondary.light,
                                color: theme.palette.secondary.dark,
                                '&:hover': {
                                    background: theme.palette.secondary.dark,
                                    color: theme.palette.secondary.light
                                }
                            }}
                            onClick={handleLeftDrawerToggle}
                            color="inherit"
                        >
                            <IconMenu2 stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </ButtonBase>
                ) : null}
            </Box>

            {/* header search */}
            {showSearchBar ? <SearchSection /> : null}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* notification & profile */}
            {/* {showNotification ? <NotificationSection /> : null} */}
            {loginDetails.loginDetails ? <ProfileSection /> : <AuthButtons />}
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func,
    showToggle: PropTypes.bool,
    showSearchBar: PropTypes.bool,
    title: PropTypes.string,
    showNotification: PropTypes.bool
};

export default Header;
