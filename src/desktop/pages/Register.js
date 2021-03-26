import React, { useState, useEffect } from 'react';
import {
    Dialog,
    Slide,
    Box,
    Tabs,
    Tab,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Snackbar,
} from '@material-ui/core';
import { VisibilityOff, Visibility } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import MiniHeader from '../layout/MiniHeader';
import RegisterStyle from '../styles/RegisterStyle';
import { useForm, Controller } from 'react-hook-form';
import { CHECK_USERID } from '../gql/register/query';
import { SIGNUP_USER } from '../gql/register/mutation';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import * as dayjs from 'dayjs';

const Register = props => {
    const classes = RegisterStyle();
    const { open, onClose } = props;
    const { handleSubmit, control, errors, getValues, setError, clearErrors } = useForm();

    const [boardNum, setNumber] = useState(0);
    const [showPwd, setShowPwd] = useState(false); //비밀번호 입력 가시화
    const [exist, setExist] = useState(false);
    const [tmpUserId, setTmpUserId] = useState('');
    const [openSnackbar, setSnackbar] = useState(false);

    const [checkUser, { data }] = useLazyQuery(CHECK_USERID, { fetchPolicy: 'no-cache' });
    const [signupUser] = useMutation(SIGNUP_USER);

    const registerUser = data => {
        const type = boardNum === 0 ? 'ADMIN' : 'DRIVER';
        signupUser({
            variables: {
                input: {
                    userId: data.userId,
                    password: data.password,
                    name: data.name,
                    phoneNumber: data.phoneNumber,
                    type: type,
                    registerDate: dayjs(new Date()).format('YYYY-MM-DD'),
                },
            },
        });
        setSnackbar(true);
    };

    const handleClose = () => {
        onClose(false);
        setExist(false);
        setSnackbar(false);
    };

    const existAlready = value => {
        if (value === '') {
            setError('userId', {
                type: 'required',
            });
        } else {
            checkUser({ variables: { userId: value } });
            setTmpUserId(value);
        }
    };

    useEffect(() => {
        if (data && open) {
            const { success, message } = data.checkUserId;
            if (success) {
                clearErrors('userId');
            } else {
                setError('userId', {
                    type: 'exist',
                });
                console.log(message);
            }
            setExist(!success);
        }

        return () => setExist(false);
    }, [data, open, clearErrors, setError]);

    const UserIdHelperText = props => {
        const { errors } = props;

        if (errors) {
            const { type } = errors;
            if (type === 'required') return '아이디를 입력해주세요.';
            if (type === 'exist') return '중복된 아이디입니다.';
            if (type === 'confirmId') return '중복확인을 먼저 눌러주세요.';
        }
        return '';
    };

    const PhoneNumberHelperText = props => {
        const { errors } = props;
        if (errors) {
            const { type } = errors;
            if (type === 'required') return '휴대폰 번호를 입력해주세요.';
            if (type === 'maxLength' || type === 'minLength') return '11자리를 입력해주세요.';
            if (type === 'isNumber') return '숫자만 입력해주세요.';
        }
        return '';
    };

    return (
        <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
            <MiniHeader handleClose={handleClose} headerText="사용자 등록" />
            <Box p={4}>
                <Box mb={5}>
                    <Tabs
                        value={boardNum}
                        onChange={(e, newValue) => setNumber(newValue)}
                        aria-label="register tabs"
                        textColor="inherit"
                    >
                        <Tab
                            classes={{ root: classes.tab }}
                            label={<Typography className={classes.tabText}>관리자</Typography>}
                        />
                        <Tab
                            classes={{ root: classes.tab }}
                            label={<Typography className={classes.tabText}>버스기사</Typography>}
                        />
                    </Tabs>
                </Box>

                <Box mb={2}>
                    <form onSubmit={handleSubmit(registerUser)}>
                        <Box height="80px" style={{ display: 'flex' }}>
                            <Box height="100%" width="70%" mr={1}>
                                <Controller
                                    as={TextField}
                                    name="userId"
                                    control={control}
                                    defaultValue=""
                                    label="아이디"
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    error={errors.userId ? true : false}
                                    helperText={
                                        errors.userId ? (
                                            <UserIdHelperText errors={errors.userId} />
                                        ) : getValues('userId') == null ||
                                          getValues('userId') === '' ? (
                                            ' '
                                        ) : (
                                            '사용가능한 아이디입니다.'
                                        )
                                    }
                                    rules={{
                                        required: true,
                                        validate: {
                                            exist: () => exist === false,
                                            confirmId: value => value === tmpUserId,
                                        },
                                    }}
                                />
                            </Box>
                            <Box height="100%" width="30%">
                                <Button
                                    className={classes.checkIdButton}
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => existAlready(getValues('userId'))}
                                >
                                    중복확인
                                </Button>
                            </Box>
                        </Box>
                        <Box height="80px" width="100%">
                            <Controller
                                as={TextField}
                                defaultValue=""
                                name="password"
                                type={showPwd ? 'text' : 'password'}
                                control={control}
                                variant="outlined"
                                size="small"
                                error={errors.password ? true : false}
                                helperText={errors.password ? '비밀번호를 입력해주세요.' : ' '}
                                rules={{
                                    required: true,
                                }}
                                fullWidth
                                label="비밀번호"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPwd(!showPwd)}
                                            >
                                                {showPwd ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        <Box height="80px" width="100%">
                            <Controller
                                as={TextField}
                                defaultValue=""
                                name="name"
                                type="text"
                                control={control}
                                variant="outlined"
                                size="small"
                                error={errors.name ? true : false}
                                helperText={errors.name ? '이름을 입력해주세요.' : ' '}
                                rules={{
                                    required: true,
                                }}
                                fullWidth
                                label={boardNum === 0 ? '이름(소속)' : '이름'}
                            />
                        </Box>
                        <Box height="80px" width="100%">
                            <Controller
                                as={TextField}
                                defaultValue=""
                                name="phoneNumber"
                                type="text"
                                control={control}
                                variant="outlined"
                                size="small"
                                error={errors.phoneNumber ? true : false}
                                helperText={
                                    errors.phoneNumber ? (
                                        <PhoneNumberHelperText errors={errors.phoneNumber} />
                                    ) : (
                                        ' '
                                    )
                                }
                                rules={{
                                    required: true,
                                    minLength: 11,
                                    maxLength: 11,
                                    validate: {
                                        isNumber: value => !isNaN(value),
                                    },
                                }}
                                fullWidth
                                label="휴대폰 번호"
                            />
                        </Box>
                        <Box height="50px" width="100%">
                            <Button
                                variant="contained"
                                type="submit"
                                size="medium"
                                className={classes.registerButton}
                            >
                                등록하기
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={1500} onClose={handleClose}>
                <Alert severity="success">등록이 완료되었습니다.</Alert>
            </Snackbar>
        </Dialog>
    );
};

//Dialog창이 아래서 올라오게 함.
const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} timeout={600} />;
});

export default Register;