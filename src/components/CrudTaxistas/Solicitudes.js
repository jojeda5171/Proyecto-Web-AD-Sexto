import React, { Component } from 'react';
import axios from 'axios';
import Global from './../../Global';
import { Redirect } from 'react-router-dom';

export default class Solicitudes extends Component {

    idRef = React.createRef();

    state = {
        solicitudes: []
        , status: false,
        estado: false
    }

    

    cargarSolicitudes = () => {
        var url = Global.urlapi;
        var request = "/solicitudes";
        axios.get(url + request).then(res => {
            this.setState({
                solicitudes: res.data
                , status: true
            });

        });
    }

    componentDidMount = () => {
        this.cargarSolicitudes();
    }
    
    modificarSolicitud = (e) => {
        e.preventDefault();
        var id = document.getElementById("x").innerHTML;
        var taxista = this.props.usuario;
        var estado = 5;
        var solicitud = {
            id: id,
            taxista_asignado: taxista,
            estado: estado
        };
        var request = "solicitudes/" + id;
        var url = Global.urlapi + request;
        axios.put(url, solicitud).then(res => {
            this.setState({estado: true});
        });
    }

    render() {
        if(this.state.estado === true){
            return <Redirect to="/" />
        }
        return (
            <div>
                <h1>Solicitudes Pendientes</h1>
                <br/>
                <table className="table table-info">
                    <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Usuario</th>
                            <th>Calle Principal</th>
                            <th>Calle Secundaria</th>
                            <th>Referencia</th>
                            <th>Barrio</th>
                            {/* <th>Detalle</th> */}
                            <th>Asignar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.status === true &&
                            (
                                this.state.solicitudes.map((soli, i) => {
                                    return (
                                        <tr key={i}>
                                            <td id='x'>{soli.id}</td>
                                            <td>{soli.usuario}</td>
                                            <td style={{ fontWeight: "bold" }}>{soli.calle_principal}</td>
                                            <td>{soli.calle_secundaria}</td>
                                            <td>{soli.referencia}</td>
                                            <td>{soli.barrio_sector}</td>
                                            {/* <td>{soli.informacion_adicional}</td> */}
                                            <td>
                                                <button className="btn btn-success" onClick={this.modificarSolicitud}>Seleccionar</button>
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