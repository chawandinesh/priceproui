import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, ButtonBase, Grid, Tooltip, IconButton } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

// assets
import { IconMenu2 } from '@tabler/icons';
import { makeStyles } from '@mui/styles';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
const useStyles = makeStyles({
    authButton: {
        margin: '5px'
    }
});

// ==============================|| MAIN NAVBAR / HEADER ||============================== //
//
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
    const location = useLocation();
    const classes = useStyles();
    const navigate = useNavigate();
    const isSearch = location.pathname === '/search';
    const loginDetails = useSelector((state) => _.get(state, 'login', ''));
    const theme = useTheme();
    return (
        <Box width="100%">
            <Grid className={classes.headerContainer} container justifyContent="space-between">
                {isSearch && (
                    <Grid item>
                        <Box paddingLeft={5}>
                            <IconButton></IconButton>
                        </Box>
                    </Grid>
                )}
                <Grid item>
                    <Grid container alignItems="center">
                        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                            <LogoSection title={title} showToggle={showToggle} />
                        </Box>
                        {showToggle ? (
                            <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden', marginLeft: { xs: 0, md: 10 } }}>
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
                    </Grid>
                </Grid>
                <Grid item>
                    {loginDetails.loginDetails ? (
                        <Grid container alignItems="center">
                            {!isSearch ? (
                                <Box paddingRight={5}>
                                    <Tooltip title={'Search Product'}>
                                        <IconButton onClick={() => navigate('/search')}>
                                            <BiSearch fontSize={30} color={theme.palette.primary.main} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            ) : (
                                <Box paddingRight={5}>
                                    <Tooltip title={'Dashboard'}>
                                        <IconButton onClick={() => navigate('/dashboard')}>
                                            <MdOutlineSpaceDashboard fontSize={30} color={theme.palette.primary.main} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            )}
                            <ProfileSection />
                        </Grid>
                    ) : (
                        <AuthButtons />
                    )}
                </Grid>
            </Grid>
        </Box>
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
