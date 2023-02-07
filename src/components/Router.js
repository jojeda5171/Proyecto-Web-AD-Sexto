import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Solicitudes from './CrudTaxistas/Solicitudes';
import Taxistas from './CrudTaxistas/Taxistas';

export default class Router extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <br />
                    <img src="/logo.png" alt="logo" width={'95%'} height={'125px'} />
                    <br /><br />
                    <Switch>
                        <Route exact path="/" component={Taxistas} />
                        <Route exact path="/asignar/:usuario" render={props => {
                            var usuario = props.match.params.usuario;
                            return <Solicitudes usuario={usuario} />
                        }} />

                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}