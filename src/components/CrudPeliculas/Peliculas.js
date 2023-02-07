import React, { Component } from 'react';
import axios from 'axios';
import Global from './../../Global';
import { NavLink } from 'react-router-dom';

export default class Peliculas extends Component {

    state = {
        peliculas: []
        , status: false
    }

    cargarPeliculas = () => {
        var url = Global.urlpeliculas;
        var request = "/taxistas";
        axios.get(url+request).then(res => {
            this.setState({
                peliculas: res.data
                , status: true
            });
        });
    }

    componentDidMount = () => {
        this.cargarPeliculas();
    }

    render() {
        return (
            <div>
                <h1>Taxistas Disponibles</h1>
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
                            this.state.peliculas.map((peli, i) => {
                                return(
                                    <tr key={i}>
                                        <td>{peli.usuario}</td>
                                        <td style={{fontWeight: "bold"}}>{peli.nombre}</td>
                                        <td>{peli.apellido}</td>
                                        <td>{peli.cooperativa}</td>
                                        <td>{peli.estado}</td>
                                        <td>
                                            <NavLink to={"/asignar/" + peli.usuario}>Asignar</NavLink>
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