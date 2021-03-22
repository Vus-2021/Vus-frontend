import React, { useState, useEffect } from 'react';
import SignUpDialog from './SignUp';
import LogInDialog from './LogIn';
import HomeStyle from '../styles/HomeStyle';
import {
    Box,
    Button,
    GridList,
    GridListTile,
    Card,
    CardMedia,
    Typography,
    CardContent,
    CardActionArea,
    AppBar,
    Tabs,
    Tab,
} from '@material-ui/core';
import { Header } from '../layout';
import { AccountCircle, NotificationsNone, DeveloperBoard } from '@material-ui/icons';
import GangNam from '../images/강남버스.png';
import ByeongJeom from '../images/병점버스.png';
import AnSan from '../images/안산버스.png';
import MangPo from '../images/망포버스.png';
import SeongNam from '../images/성남버스.png';
import clsx from 'clsx';
import { GET_MY_INFO, GET_ROUTE_INFO } from '../gql/home/query';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import * as dayjs from 'dayjs';

const busImages = [
    {
        image: GangNam,
    },
    {
        image: ByeongJeom,
    },
    {
        image: AnSan,
    },
    {
        image: MangPo,
    },
    {
        image: SeongNam,
    },
];

const boardDummyData = {
    notice: [
        {
            title: '5월 1일부터 엑셀 신청은 받지 않습니다.',
        },
        {
            title: '4월 13일 강남노선 미운영',
        },
        {
            title: '신규 입사자 필독!',
        },
    ],
    board: [
        {
            title: '안산노선 버스 정차 상세내용',
        },
        {
            title: '강남노선 버스 정차 상세내용',
        },
        {
            title: '망포노선 버스 정차 상세내용',
        },
    ],
};

const Home = () => {
    const classes = HomeStyle();
    const [isLogin, setIsLogin] = useState(false); //로그인 상태 여부
    const [boardNum, setNumber] = useState(0);
    const [signUpDialog, setSignUpDialog] = useState(false); //회원가입 Dialog open 여부
    const [LoginDialog, setLoginDialog] = useState(false); //로그인 Dialog open 여부
    const [userData, setUserData] = useState({
        //user의 정보를 담음.
        name: '',
        userId: '',
        type: '',
    });
    const [routeInfo, setRouteInfo] = useState([]);

    const [getMyInfo, { data: myData }] = useLazyQuery(GET_MY_INFO, { fetchPolicy: 'no-cache' });
    const { data: busData } = useQuery(GET_ROUTE_INFO, {
        variables: { month: dayjs(new Date()).format('YYYY-MM') },
    });

    const handleSignUpClose = value => {
        setSignUpDialog(false);
    };

    const handleLogInClose = value => {
        setLoginDialog(false);
        getMyInfo();
    };

    const secondButtonClick = () => {
        if (isLogin) {
            localStorage.clear();
            setIsLogin(false);
            window.location.reload();
        } else setSignUpDialog(true);
    };

    // 로그인 성공 후 유저의 데이터를 불러옴
    useEffect(() => {
        if (myData) {
            if (myData.getMyInformation.success) {
                const { name, userId, type } = myData.getMyInformation.data;
                setIsLogin(true);
                setUserData({
                    name: name,
                    userId: userId,
                    type: type,
                });
            }
        }

        return () =>
            setUserData({
                name: '',
                userId: '',
                type: '',
            });
    }, [myData]);

    //버스 데이터를 불러옴
    useEffect(() => {
        if (busData) {
            const { success, data } = busData.getRoutesInfo;
            if (success) {
                setRouteInfo(data);
            }
        }
    }, [busData]);

    return (
        <div>
            <Header />
            <Box pl={3} pr={3} pt={2} pb={2} className={classes.mainBox}>
                <Box height="4%" className={classes.requireLogin}>
                    <Box mr={1}>
                        <AccountCircle fontSize="large" />
                    </Box>
                    {isLogin ? `환영합니다. ${userData.name} 님` : '로그인이 필요합니다.'}
                </Box>
                <Box mt={1} mb={1} height="3%" className={classes.getMyData}>
                    <Button disabled={!isLogin}>
                        <Box className={classes.buttonFont}>나의 신청현황 보기</Box>
                    </Button>
                </Box>
                <Box mt={1} height="38%" className={classes.chooseBus}>
                    <BusList routeInfo={routeInfo} />
                </Box>
                <Box height="3%" className={classes.moreBoard}>
                    <Button size="large">더보기</Button>
                </Box>
                <Box mb={1} height="27%" className={classes.board}>
                    <Box>
                        <AppBar height="30%" position="static">
                            <Tabs
                                value={boardNum}
                                onChange={(e, newValue) => setNumber(newValue)}
                                aria-label="bus board tabs"
                                centered
                                variant="fullWidth"
                            >
                                <Tab
                                    label={
                                        <div>
                                            <NotificationsNone
                                                style={{ verticalAlign: 'middle' }}
                                            />
                                            &nbsp;&nbsp;공지사항
                                        </div>
                                    }
                                />
                                <Tab
                                    label={
                                        <div>
                                            <DeveloperBoard style={{ verticalAlign: 'middle' }} />
                                            &nbsp;&nbsp;게시판
                                        </div>
                                    }
                                />
                            </Tabs>
                        </AppBar>
                    </Box>
                    <TabPanel content={boardDummyData.notice} value={boardNum} index={0} />
                    <TabPanel content={boardDummyData.board} value={boardNum} index={1} />
                </Box>
                <Box mb={1} height="20%" className={classes.buttonList}>
                    <Button
                        className={clsx(classes.buttonCommon, classes.loginButton)}
                        variant="contained"
                        onClick={() => setLoginDialog(true)}
                    >
                        {isLogin ? '노선 신청하기' : '로그인'}
                    </Button>
                    <Button
                        className={clsx(classes.buttonCommon, classes.signUpButton)}
                        variant="contained"
                        onClick={secondButtonClick}
                    >
                        {isLogin ? '로그아웃' : '회원가입'}
                    </Button>
                    <LogInDialog open={LoginDialog} onClose={handleLogInClose} />
                    <SignUpDialog open={signUpDialog} onClose={handleSignUpClose} />
                </Box>
            </Box>
        </div>
    );
};

const TabPanel = props => {
    const classes = HomeStyle();
    const { content, value, index } = props;

    const boardList = content.map((data, index) => (
        <Box key={index} pl={2} height="33%" className={classes.titleBox}>
            <Typography>{data.title}</Typography>
        </Box>
    ));
    return (
        <React.Fragment>
            {value === index && (
                <Box height="70%" className={classes.tabBox}>
                    {boardList}
                </Box>
            )}
        </React.Fragment>
    );
};

const BusList = props => {
    const classes = HomeStyle();
    const { routeInfo } = props;
    const busList = routeInfo.map((data, index) => (
        <GridListTile key={data.route}>
            <Card elevation={5} className={classes.busCard}>
                <CardActionArea className={classes.cardAction}>
                    <CardMedia component="img" src={busImages[index].image} title="BusImage" />
                    <CardContent>
                        <Typography className={classes.busInfo} align="center">
                            {data.busNumber}
                        </Typography>
                        <Typography align="center">
                            신청자: {data.registerCount} / {data.limitCount}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </GridListTile>
    ));
    return (
        <GridList cellHeight="auto" className={classes.busList} cols={2}>
            {busList}
        </GridList>
    );
};

export default Home;
