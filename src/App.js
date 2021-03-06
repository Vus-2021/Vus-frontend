import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserHome, DriverHome, BusInfo, Notice, MyInformation } from './mobile/pages';
import { AdminHome, Admin, Error } from './desktop/pages';
import { useMediaQuery } from 'react-responsive';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';

const App = () => {
    const isMobile = useMediaQuery({
        query: '(max-width:500px)',
    });

    return (
        <MuiPickersUtilsProvider utils={DayjsUtils}>
            {isMobile ? (
                <Switch>
                    <Route path="/" component={UserHome} exact />
                    <Route path="/driver" component={DriverHome} />
                    <Route path="/notice" component={Notice} />
                    <Route path="/businfo" component={BusInfo} />
                    <Route path="/myinfo" component={MyInformation} />
                </Switch>
            ) : (
                <Switch>
                    <Route path="/" component={AdminHome} exact />
                    <Route path="/admin" component={Admin} />
                    <Route path="/error" component={Error} />
                </Switch>
            )}
        </MuiPickersUtilsProvider>
    );
};

export default App;
