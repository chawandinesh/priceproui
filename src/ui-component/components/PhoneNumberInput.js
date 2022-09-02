import { FormControl, FormHelperText, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { forwardRef } from 'react';

const phoneInput = ({ theme, touched, errors, handleBlur, ...rest }, ref) => {
    return (
        <FormControl {...rest} fullWidth sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-email-register">Phone number</InputLabel>
            <OutlinedInput
                onBlur={handleBlur}
                inputRef={ref}
                fullWidth
                size="medium"
                label="Phone Number"
                variant="outlined"
                name="phone_no"
            />
            {touched.phone_no && errors.phone_no && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                    {errors.phone_no}
                </FormHelperText>
            )}
        </FormControl>
    );
};
export default forwardRef(phoneInput);
