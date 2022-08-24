import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Typography } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';

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

export default LogoSection;
