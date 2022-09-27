import {  StyledTitle,  StyledFormArea, StyledButton2, ButtonGroup, StyledFormAreaUser, colors} from "../components/Styles";
import { connect } from "react-redux";
import { logoutUser } from "../auth/actions/userActions";
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from "react";

import './tableStyls.css';

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Col,
  } from "reactstrap";


// API client
import axios from 'axios';

const Bicicletas = ({logoutUser, user}) => {

    const [bicicletas, setBicicletas] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        async function loadBicicletas() {
            if (loading)
            return
            if (total > 0 && bicicletas.length === total)
            return
            setLoading(true)
    
            const response = await axios.get("https://server-comunity-bikes.herokuapp.com/bicicleta/",{
            params: {
                page,
            }
            })
    
            setBicicletas([...bicicletas, ...response.data])
            setTotal(response.headers['x-total-count'])
            setPage(page)
            setLoading(false)
        }
        loadBicicletas()
    }, [])


    const navigate = useHistory();

    return (
        <StyledFormArea style={{ marginTop: '20px', marginBottom: '20px'}}>
        <Card style={{borderRadius: "30px"}}>
          <CardHeader style={{borderRadius: "30px"}}>
            <CardTitle className="thead">Lista de Bicicletas</CardTitle>
          </CardHeader>
          <CardBody style={{borderRadius: "30px"}}>
            <Table className="tablesorter" responsive>
                            <thead className="trHead">
                                <tr>
                                    <th>Bicicleta</th>
                                    <th>Preço/Minuto(€)</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Uso Total(min)</th>
                                    <th>Disponibilidade (T/F)</th>
                                    <th>Link da Imagem</th>
                                </tr>
                            </thead> 
                            {bicicletas.map(bicicleta => {
                                return (
                                    <tbody>
                                        <tr >
                                            <td >{bicicleta.name}</td>
                                            <td >{(bicicleta.priceHour).toFixed(2)}</td>
                                            <td >{(bicicleta.latitude).toFixed(3)}</td>
                                            <td >{(bicicleta.longitude).toFixed(3)}</td>
                                            <td >{bicicleta.hoursUsed}</td>
                                            <td >{(bicicleta.available).toString()}</td>
                                            <td > <img 
                                                style={{resizeMode: "contain",
                                                        height: 50,
                                                        width: 70}}
                                                src={bicicleta.imageUrl} 
                                                alt="Bike Logo"/>
                                            </td>
                                        </tr>
                                    </tbody> 
                                );
                            })}             
                        </Table>
            <ButtonGroup>
              <StyledButton2 to="/home">Voltar</StyledButton2>
              <StyledButton2 to="/novaBike">Adicicionar Bicicleta</StyledButton2>
            </ButtonGroup>
          </CardBody>
        </Card>
      </StyledFormArea>
    );
}


const mapStateToProps = ({session}) => ({
    user: session.user
})

export default connect(mapStateToProps, {logoutUser})(Bicicletas);