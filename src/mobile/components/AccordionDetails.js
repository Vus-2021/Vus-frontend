import { withStyles } from '@material-ui/core/styles';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

const AccordionSummary = withStyles(theme => ({
    root: {
        paddingX: theme.spacing(2),
        backgroundColor: '#FFE3E3',
    },
}))(MuiAccordionDetails);

export default AccordionSummary;
