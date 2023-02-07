import React, { Component } from 'react';
import axios from 'axios';
import Global from './../../Global';

export default class Peliculas extends Component {

    state = {
        peliculas: []
        , status: false
    }

    solicitud = {
        id: "",
        taxista_asignado: "",
        estado: ""
    }

    cargarPeliculas = () => {
        var url = Global.urlpeliculas;
        var request = "/solicitudes";
        axios.get(url + request).then(res => {
            this.setState({
                peliculas: res.data
                , status: true
            });

        });
    }

    componentDidMount = () => {
        this.cargarPeliculas();
    }

    editar(fila) {
        this.solicitud.id = fila.id;
        this.solicitud.taxista_asignado=this.props.usuario;
        this.solicitud.estado = "3";
        
        var url = Global.urlpeliculas;
        var request = "solicitudes/";
        axios.put(url+request+this.solicitud.id, this.solicitud).then(res => {
            this.setState({ status: true });
            window.history.back();
        });
    }

    render() {
        return (
            <div>
                <h1>Solicitudes Pendientes</h1>
                <table className="table table-info">
                    <thead className="thead-dark">
                        <tr>
                            <th>Usuario</th>
                            <th>Calle Principal</th>
                            <th>Calle Secundaria</th>
                            <th>Referencia</th>
                            <th>Barrio</th>
                            <th>Detalle</th>
                            <th>Asignar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.status === true &&
                            (
                                this.state.peliculas.map((peli, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{peli.usuario}</td>
                                            <td style={{ fontWeight: "bold" }}>{peli.calle_principal}</td>
                                            <td>{peli.calle_secundaria}</td>
                                            <td>{peli.referencia}</td>
                                            <td>{peli.barrio_sector}</td>
                                            <td>{peli.informacion_adicional}</td>
                                            <td>
                                                <button className="btn btn-success" onClick={this.editar(peli)}>Seleccionar</button>
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