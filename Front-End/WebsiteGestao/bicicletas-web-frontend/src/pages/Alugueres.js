import {  StyledTitle,  StyledFormArea, StyledButton2, StyledFormAreaUser, colors} from "../components/Styles";
import { connect } from "react-redux";
import { logoutUser } from "../auth/actions/userActions";
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from "react";

import './tableStyls.css';

// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Col,
  } from "reactstrap";

// API client
import axios from 'axios';

const Alugueres = ({logoutUser, user}) => {

    const [alugueres, setAlugueres] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        async function loadAlugueres() {
            if (loading)
            return
            if (total > 0 && alugueres.length === total)
            return
            setLoading(true)
    
            const response = await axios.get("https://server-comunity-bikes.herokuapp.com/aluguer/",{
            params: {
                page,
            }
            })
    
            setAlugueres([...alugueres, ...response.data])
            setTotal(response.headers['x-total-count'])
            setPage(page)
            setLoading(false)
        }
        loadAlugueres()
    }, [])


    const navigate = useHistory();

    return (
        <StyledFormArea style={{ marginTop: '20px', marginBottom: '20px'}}>
        <Card style={{borderRadius: "30px"}}>
          <CardHeader style={{borderRadius: "30px"}}>
            <CardTitle className="thead">Lista de Alugueres</CardTitle>
          </CardHeader>
          <CardBody style={{borderRadius: "30px"}}>
            <Table className="tablesorter" responsive>
                            <thead className="trHead">
                                <tr >
                                    <th >Bicicleta</th>
                                    <th >Utilizador</th>
                                    <th >Preço (€)</th>
                                    <th >Hora início</th>
                                    <th >Hora fim</th>
                                    <th >Minutos de Uso</th>
                                    <th >Finalizado (T/F)</th>
                                </tr>
                            </thead> 
                            {alugueres.map(aluguer => {
                                return (
                                    <tbody>
                                        <tr >
                                            <td >{aluguer.bike}</td>
                                            <td >{aluguer.user}</td>
                                            <td>{(aluguer.price).toFixed(2)}</td>
                                            <td >{new Date(aluguer.startHour).toLocaleString()}</td>
                                            <td >{new Date(aluguer.endHour).toLocaleString()}</td>
                                            <td >{aluguer.hoursUsed}</td>
                                            <td >{(aluguer.available).toString()}</td>
                                        </tr>
                                    </tbody> 
                                );
                            })}             
                       </Table>
            <ButtonGroup>
              <StyledButton2 to="/home">Voltar</StyledButton2>
            </ButtonGroup>
          </CardBody>
        </Card>
      </StyledFormArea>
    );
}


const mapStateToProps = ({session}) => ({
    user: session.user
})

export default connect(mapStateToProps, {logoutUser})(Alugueres);