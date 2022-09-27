import { StyledTitle,  StyledFormArea, StyledSubTitle, StyledButton2, StyledFormAreaUser, colors, ExtraText} from "../components/Styles";
import { connect } from "react-redux";
import { logoutUser } from "../auth/actions/userActions";
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";

import './tableStyls.css';

// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardFooter,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col,
    UncontrolledTooltip
  } from "reactstrap";

// API client
import axios from 'axios';

const Users = ({logoutUser, user}) => {

    const [users, setUsers] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)


    useEffect(() => {

        async function loadUsers() {
            if (loading)
            return
            if (total > 0 && users.length === total)
            return
            setLoading(true)
    
            const response = await axios.get("https://server-comunity-bikes.herokuapp.com/user/",{
            params: {
                page,
            }
            })
    
            setUsers([...users, ...response.data])
            setTotal(response.headers['x-total-count'])
            setPage(page)
            setLoading(false)
        }
    

        loadUsers()
    }, [])


    const navigate = useHistory();

    return (
      <StyledFormArea style={{ marginTop: '20px', marginBottom: '20px'}}>
      <Card style={{borderRadius: "30px"}}>
        <CardHeader style={{borderRadius: "30px"}}>
          <CardTitle className="thead">Lista de Utilizadores</CardTitle>
        </CardHeader>
        <CardBody style={{borderRadius: "30px"}}>
          <Table className="tablesorter" responsive>
            <thead className="trHead">
              <tr>
                <th>Nome</th>
                <th>Data de nascimento</th>
                <th>E-mail</th>
              </tr>
            </thead>
            {users.map(user => {
                        return (
            <tbody>
              <tr>
                <td>{user.name}</td>
                <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                <td>{user.email}</td>
              </tr>
            </tbody>
            );
          })} 
          </Table>
            <ButtonGroup>
              <StyledButton2 to="/dashboard">Voltar</StyledButton2>
            </ButtonGroup>
        </CardBody>
      </Card>
    </StyledFormArea>
    );
}

const mapStateToProps = ({session}) => ({
    user: session.user
})

export default connect(mapStateToProps, {logoutUser})(Users);