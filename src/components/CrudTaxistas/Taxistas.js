import React, { Component } from 'react';
import axios from 'axios';
import Global from '../../Global';
import { NavLink } from 'react-router-dom';

export default class Taxistas extends Component {

    state = {
        taxistas: []
        , status: false
    }

    cargarTaxistas = () => {
        var url = Global.urlapi;
        var request = "taxistas";
        axios.get(url+request).then(res => {
            this.setState({
                taxistas: res.data
                , status: true
            });
        });
    }

    componentDidMount = () => {
        this.cargarTaxistas();
    }

    render() {
        return (
            <div>
                <h1>Taxistas Disponibles</h1>
                <br/>
                <table className="table table-info">
                    <thead className="thead-dark">
                        <tr>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Cooperativa</th>
                            <th>Estado</th>
                            <th>Asignar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.status === true &&
                        (
                            this.state.taxistas.map((taxi, i) => {
                                return(
                                    <tr key={i}>
                                        <td>{taxi.usuario}</td>
                                        <td style={{fontWeight: "bold"}}>{taxi.nombre}</td>
                                        <td>{taxi.apellido}</td>
                                        <td>{taxi.cooperativa}</td>
                                        <td>{taxi.estado}</td>
                                        <td>
                                            <NavLink to={"/asignar/" + taxi.usuario}>Asignar</NavLink>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}