import React, { useState,useEffect } from 'react';
// import AuthWrapper from '../AuthWrapper';
import hepllogo from 'assets/images/users/Hepl logo.png';
import { Box } from '../../../../node_modules/@mui/material/index';
// import axiosInstance from '../../../constants/Global';
import {
    FormControl,
    Button,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
// project import
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import AnimateButton from 'components/@extended/AnimateButton';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useParams,Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import { ResetPasswordApi,CheckLinkStatus } from 'components/redux/login/action';


export const ResetPassword = () => {

    let { token } = useParams();
    
    let decoded;
    if (token === '') {
        decoded = '';
    } else {
        let decoded1 = atob(token);
        decoded = atob(decoded1);
    }

    const dispatch = useDispatch();
    const [level, setLevel] = useState();
    // const [levelValue, setLevelValue] = useState(0);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPasswordMismatch, setConfirmPasswordMismatch] = useState('');
    const [showPasswordMismatchError, setShowPasswordMismatchError] = useState('');
    // const [isSubmitting, setIsSubmitting] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [view, setView] = useState(false);

    const { linkId } = useParams();
    const [isValid, setIsValid] = useState(true); // Initially assume link is valid
    const [errorMessage, setErrorMessage] = useState("");

    // const validationSchema = () => {
      
    //     return baseSchema;
    // };
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPassword2 = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const digit = value.length;
        if(digit > 0){
            setView(true);
        }else{
            setView(false);
        }
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
        setNewPassword(value);
    };

    const validateConfirmPassword = (value) => {
        if (newPassword !== value && value != "") {
            // Passwords do not match
            setConfirmPasswordMismatch(true); 
            setShowPasswordMismatchError(true);
        } else {
            // Passwords match
            setConfirmPasswordMismatch(false);
            setShowPasswordMismatchError(false);
        }
    }

    useEffect(() => {
        changePassword('');

        dispatch(CheckLinkStatus(decoded)).then((response) => {
            if(response.data.activeStatus == "Active"){
                setIsValid(true);
            }else{
                setIsValid(false);
                setErrorMessage(response.data.activeStatus);
            }
        })
        .catch((error) => {
            console.error('Error validating link:', error.message);
            setIsValid(false);
        });

        // const validateLink = async () => {
        //     try {
        //         const response = await axiosInstance.get(`/auth/check-by-mail?email=${decoded}`, {
        //             headers: {
        //               'Content-Type': 'application/json',
        //             }
        //         });
        //         if(response.data.activeStatus == "Active"){
        //             setIsValid(true);
        //         }else{
        //             setIsValid(false);
        //             setErrorMessage(response.data.activeStatus);
        //         }
              
        //     } catch (error) {
        //         console.error('Error validating link:', error.message);
        //         setIsValid(false);
        //     }
        // };
    
        // validateLink();
    }, [linkId]);
      // Redirect to PageNotFound if the link is not valid
  if (!isValid) {
    return <Navigate to="/page-not-found" />;
  }
    

  return (
    <Box>
        {isValid ? (
            <Grid spacing={3} columns={12} xs={12} sm={12} md={12} lg={12}>
                <div className="login-right">
                <Grid>
                    <img src={hepllogo} alt="hepl-logo" style={{ width: '95px', display: 'flex', margin: 'auto', justifyContent: 'center' }} />
                </Grid>
                <Grid
                    sx={{
                    mt: 4
                    }}
                >
                    <Typography
                    sx={{
                        fontWeight: '700',
                        color: '#454F5B',
                        fontSize: {
                        lg: '20px',
                        md: '20px',
                        sm: '20px'
                        },
                        margin: 'auto',
                        textAlign: 'center',
                        fontFamily: 'Open Sans'
                    }}
                    >
                    <h3 style={{ fontWeight: 700 }}>Set New Password</h3>
                    </Typography>
                </Grid>
                <Formik
                        initialValues={{
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={Yup.object().shape({
                            password: Yup.string().max(255).required('Password is required'),
                            confirmPassword: Yup.string().max(255).required('Confirm Password is required')
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {

                            if (values.password !== values.confirmPassword) {
                                return;
                            }
                            values.email = decoded;
                            // values.email ="manju.s@hepl.com";

                            dispatch(ResetPasswordApi(values)).then((response) => {
                                if(response.status =='201'){
                                    toast.success(response.data.message);
                                }
                                setStatus({ success: false });
                                setSubmitting(false);
                                setView(false);
                                resetForm(); // Reset the form
                                changePassword('');
                                const timeoutId = setTimeout(() => {
                                    setIsValid(false);
                                }, 50000);
                                return () => clearTimeout(timeoutId);
                            })
                            .catch((error) => {
                                toast.error('Invalid credential', error);
                                setStatus({ success: false });
                                setErrors({ submit: error });
                                setSubmitting(false);
                                toast.error(error);
                            });
                            // try {
                            //     const response = await axiosInstance.put(`/auth/reset-password`, values, {
                            //         headers: {
                            //         'Content-Type': 'application/json',
                            //         }
                            //     });

                            //     if(response.status =='201'){
                            //         toast.success(response.data.message);
                            //     }
                            //     setStatus({ success: false });
                            //     setSubmitting(false);
                            //     setView(false);
                            //     resetForm(); // Reset the form
                            //     changePassword('');

                            // } catch (err) {
                            //     setStatus({ success: false });
                            //     setErrors({ submit: err.message });
                            //     setSubmitting(false);
                            //     toast.error(err.message);
                            // }
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid item container spacing={3} style={{justifyContent:"center"}}>
                                    <Grid item xs={12} sm={3}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="password-signup">New Password</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.password && errors.password)}
                                                id="password-signup"
                                                type={showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                name="password"
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    changePassword(e.target.value);
                                                }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                placeholder="******"
                                                inputProps={{}}
                                            />
                                            {touched.password && errors.password && (
                                                <FormHelperText error id="helper-text-password-signup">
                                                    {errors.password}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                        {view ? (
                                            <FormControl fullWidth sx={{ mt: 2 }}>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item>
                                                        <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" fontSize="0.75rem">
                                                            {level?.label}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </FormControl>
                                            ): ''
                                        }
                                    
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={3} style={{justifyContent:"center", marginTop:"2px"}} >
                                    <Grid item xs={12} sm={3}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="password-signup">Confirm Password</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={
                                                    Boolean(
                                                        (touched.confirmPassword && errors.confirmPassword) || // Error from Yup validation
                                                        (confirmPasswordMismatch && !showPasswordMismatchError) // Custom error for password mismatch
                                                    )
                                                }
                                                id="confirmPassword"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={values.confirmPassword}
                                                name="confirmPassword"
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    validateConfirmPassword(e.target.value);
                                                }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword2}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                placeholder="******"
                                                inputProps={{}}
                                            />
                                            {touched.confirmPassword && errors.confirmPassword && (
                                                <FormHelperText error id="helper-text-password-signup">
                                                    {errors.confirmPassword}
                                                </FormHelperText>
                                            )}
                                            {confirmPasswordMismatch && showPasswordMismatchError && (
                                                <FormHelperText error id="helper-text-password-mismatch">
                                                    Confirm password does not match the new password.
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                </Grid>
                                
                                <Grid item container spacing={3} style={{justifyContent:"center", marginTop:"2px"}}>
                                    <Grid item xs={12} sm={3} md={3}>
                                        {errors.submit && (
                                            <Grid item xs={12} >
                                                <FormHelperText error>{errors.submit}</FormHelperText>
                                            </Grid>
                                        )}

                                        <Stack spacing={1}>
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    disabled={isSubmitting}
                                                    // disabled={isSubmitting}
                                                    // onClick={submitNewPassword}
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    Reset Password
                                                </Button>
                                            </AnimateButton>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </div>
            </Grid>
        ) : errorMessage === "Expired" ? (
            <h1>Link is not valid!</h1>
        ) : errorMessage === "Updated" ? (
            <h1>Link has been updated!</h1>
        ) : (
            <h1>Link is not valid!</h1>
        )}
    </Box>
  );
};

export default ResetPassword;
