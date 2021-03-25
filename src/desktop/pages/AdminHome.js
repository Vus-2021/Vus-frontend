import React, { useState } from 'react';
import HomeStyle from '../styles/HomeStyle';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Header from '../layout/Header';
import { useForm, Controller } from 'react-hook-form';
// import { SIGNIN } from '../gql/home/mutation';

const AdminHome = () => {
    const classes = HomeStyle();
    const [showPwd, setShowPwd] = useState(false);

    const { errors, handleSubmit, control } = useForm();

    const signInSubmit = data => {
        console.log(data);
    };

    return (
        <React.Fragment>
            <div className={classes.rootBox}>
                <Header />
                <Box className={classes.mainBox} width="100%" pt={9}>
                    <Paper elevation={12} className={classes.loginPaper}>
                        <Box pl={3} pr={3} pt={5} width="350px" height="500px">
                            <form onSubmit={handleSubmit(signInSubmit)}>
                                <Box height="200px">
                                    <Typography
                                        variant="h2"
                                        color="error"
                                        style={{ fontWeight: '500' }}
                                    >
                                        로고 이미지 <br />
                                        공사중.
                                    </Typography>
                                </Box>
                                <Box mb={3}>
                                    <Controller
                                        name="adminId"
                                        as={TextField}
                                        defaultValue=""
                                        rules={{ required: true }}
                                        error={errors.adminId ? true : false}
                                        variant="outlined"
                                        fullWidth
                                        size="medium"
                                        label={<b>관리자 아이디</b>}
                                        helperText={errors.adminId ? '아이디를 입력해주세요.' : ' '}
                                        control={control}
                                    />
                                </Box>
                                <Box mb={3}>
                                    <Controller
                                        name="password"
                                        type={showPwd ? 'text' : 'password'}
                                        as={TextField}
                                        defaultValue=""
                                        rules={{ required: true }}
                                        error={errors.adminId ? true : false}
                                        variant="outlined"
                                        fullWidth
                                        size="medium"
                                        label={<b>비밀번호</b>}
                                        helperText={
                                            errors.password ? '비밀번호를 입력해주세요.' : ' '
                                        }
                                        control={control}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => setShowPwd(!showPwd)}
                                                    >
                                                        {showPwd ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                                <Box width="100%">
                                    <Button
                                        size="large"
                                        type="submit"
                                        className={classes.registerButton}
                                    >
                                        로그인
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Paper>
                    <Box mt={3} mb={3}>
                        <Alert severity="warning" className={classes.alert}>
                            <Typography color="textPrimary">
                                일반 사용자는 PC버젼을 이용하실 수 없습니다.
                            </Typography>
                        </Alert>
                    </Box>
                </Box>
            </div>
        </React.Fragment>
    );
};

export default AdminHome;