import React, { Component } from 'react';
import axios from 'axios';
import Global from './../../Global';
import { Redirect } from 'react-router-dom';

export default class Peliculas extends Component {

    idRef = React.createRef();

    state = {
        peliculas: []
        , status: false,
        estado: false
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

/*     editar(fila) {
        console.log("editar");
        this.solicitud.id = fila.id;
        this.solicitud.taxista_asignado=this.props.usuario;
        this.solicitud.estado = "5";
        
        var url = Global.urlpeliculas;
        var request = "solicitudes/";
        axios.put(url+request+this.solicitud.id, this.solicitud).then(res => {
            this.setState({ estado: true });
            //window.history.back();
        });
    } */

    modificarPelicula = (e) => {
        e.preventDefault();
        console.log("modificarPelicula");
        //var id = this.idRef.current.value;
        var id = document.getElementById("x").innerHTML;
        var taxista = this.props.usuario;
        var estado = 5;
        console.log(id);
        var solicitud = {
            id: id,
            taxista_asignado: taxista,
            estado: estado
        };
        var request = "solicitudes/" + id;
        var url = Global.urlpeliculas + request;
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
                <table className="table table-info">
                    <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
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
                                    //{/* <input type="hidden" ref={this.idRef} value={peli.id} /> */}
                                    return (
                                        <tr key={i}>
                                            <td id='x'>{peli.id}</td>
                                            <td>{peli.usuario}</td>
                                            <td style={{ fontWeight: "bold" }}>{peli.calle_principal}</td>
                                            <td>{peli.calle_secundaria}</td>
                                            <td>{peli.referencia}</td>
                                            <td>{peli.barrio_sector}</td>
                                            <td>{peli.informacion_adicional}</td>
                                            <td>
                                                <button className="btn btn-success" onClick={this.modificarPelicula}>Seleccionar</button>
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