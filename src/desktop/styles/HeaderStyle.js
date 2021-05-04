import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 250;

const HeaderStyle = makeStyles(theme => ({
    headerBar: {
        backgroundColor: '#D81717',
        zIndex: theme.zIndex.drawer + 1,
        padding: 0,
    },
    logoBox: {
        flexGrow: 1,
    },
    logoutButton: {
        height: '35px',
        backgroundColor: '#D81717',
        color: 'white',
        '&:hover': {
            backgroundColor: '#D81717',
        },
    },
    menuIcon: {
        fontSize: '36px',
        color: 'white',
    },
    menuIconSmall: {
        fontSize: '25px',
        color: 'white',
    },
    adminId: {
        fontSize: '18px',
        fontWeight: '700',
        marginRight: '3px',
    },
    adminIdSmall: {
        fontSize: '16px',
        fontWeight: '700',
        marginRight: '3px',
    },
    toolbar: theme.mixins.toolbar,
    menuDrawer: {
        flexShrink: 0,
        width: drawerWidth,
        zIndex: 9999,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    listIcon: {
        fontSize: 30,
    },
    listText: {
        fontSize: '19px',
        fontWeight: '400',
    },
    nestedIcon: {
        fontSize: 25,
    },
    nested: {
        paddingLeft: theme.spacing(6),
    },
    nestedText: {
        fontSize: '17px',
        fontWeight: '400',
    },
    doubleNested: {
        paddingLeft: theme.spacing(8),
    },
    monthNestedIcon: {
        fontSize: 22,
    },

    warningTitle: {
        fontSize: '23px',
        fontWeight: 600,
    },
    warningText: {
        fontSize: '18px',
        fontWeight: 400,
    },
    cancelButton: {
        width: '100%',
        backgroundColor: '#008AEE',
        color: 'white',
        '&:hover': {
            backgroundColor: '#008AEE',
        },
    },
    createButton: {
        width: '100%',
        backgroundColor: '#FA8700',
        color: 'white',
        '&:hover': {
            backgroundColor: '#FA8700',
        },
    },
}));

export default HeaderStyle;
