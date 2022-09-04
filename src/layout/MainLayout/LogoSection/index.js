import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// project imports
import config from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ title, showToggle }) => (
    <>
        {showToggle ? (
            <ButtonBase disableRipple component={Link} to={config.defaultPath}>
                {/* <Logo /> */}
                <Typography component="h3" variant="h3" color="primary">
                    {title}
                </Typography>
            </ButtonBase>
        ) : (
            <Typography component="h2" variant="h2" color="primary">
                {title}
            </Typography>
        )}
    </>
);

LogoSection.propTypes = {
    title: PropTypes.string,
    showToggle: PropTypes.bool
};
export default LogoSection;
