import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import MessengerCustomerChat from 'react-messenger-customer-chat';
import React, { Redirect } from "react";
import { withAuthenticationRequired } from '@auth0/auth0-react'

import { LoginScreen } from "../components/Login/LoginScreen";
import Block from "../Block";
import Intro from "../Intro";


const ProtectedRoute = ({ component }) => (
    <Route component={withAuthenticationRequired(component)} />
);



export const AppRouter = () => {



    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/login" component={LoginScreen} />
                    <ProtectedRoute exact path="/" component={Intro} />
                    <ProtectedRoute exact path="/block" component={Block} />
                    <Redirect to="/login" />
                </Switch>
            </Router>
            <MessengerCustomerChat pageId="109132038102012" appId="320817016358987" />
        </>
    );
}
