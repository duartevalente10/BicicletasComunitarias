import { connect } from "react-redux";
import { logoutUser } from "../auth/actions/userActions";
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import { StyledTitle, StyledFormAreaTable, StyledButton, ButtonGroup, StyledFormAreaUser, colors } from "../components/Styles";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Col,
} from "reactstrap";


const Stats = () => {

    return (
        <div style={{ padding: '30px', marginLeft: '0px' }} width="95%" height="95%">

            <CardTitle className="thead2">Estatísticas das Bicicletas</CardTitle>
            <iframe style={{ background: '#FFFFFF', borderRadius: '20px', boxShadow: "15px 10px 10px #86B049", marginRight: '2em', marginLeft: '2em', marginBottom: '3em' }} width="550" height="400" src="https://charts.mongodb.com/charts-project-0-wouny/embed/charts?id=631d16cf-3c46-4604-8964-216516635762&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
            <iframe style={{ background: '#FFFFFF', borderRadius: '20px', boxShadow: "15px 10px 10px #86B049", marginRight: '2em', marginLeft: '2em', marginBottom: '3em' }} width="550" height="400" src="https://charts.mongodb.com/charts-project-0-wouny/embed/charts?id=631d1e0e-39af-4264-84ae-42d95adc29fe&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
            <iframe style={{ background: '#FFFFFF', borderRadius: '20px', boxShadow: "15px 10px 10px #86B049", marginRight: '2em', marginLeft: '2em', marginBottom: '3em' }} width="550" height="400" src="https://charts.mongodb.com/charts-project-0-wouny/embed/charts?id=631d3111-3c46-4bf4-8933-21651676204e&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
            
            <CardTitle className="thead2">Estatísticas dos Alugeres</CardTitle>
            <iframe style={{ background: '#FFFFFF', borderRadius: '20px', boxShadow: "15px 10px 10px #86B049", marginRight: '2em', marginLeft: '2em', marginBottom: '3em' }} width="550" height="400" src="https://charts.mongodb.com/charts-project-0-wouny/embed/charts?id=631d2024-180c-485d-8030-fec7a9584624&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
            <iframe style={{ background: '#FFFFFF', borderRadius: '20px', boxShadow: "15px 10px 10px #86B049", marginRight: '2em', marginLeft: '2em', marginBottom: '3em' }} width="550" height="400" src="https://charts.mongodb.com/charts-project-0-wouny/embed/charts?id=631d2a4b-2840-4094-8def-8634b9d0230f&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
            <iframe style={{ background: '#FFFFFF', borderRadius: '20px', boxShadow: "15px 10px 10px #86B049", marginRight: '2em', marginLeft: '2em', marginBottom: '3em' }} width="550" height="400" src="https://charts.mongodb.com/charts-project-0-wouny/embed/charts?id=631d1c98-2840-48cc-8996-8634b9c62bec&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>

            <CardTitle className="thead2">Estatísticas dos Utilizadores</CardTitle>
            <iframe style={{ background: '#FFFFFF', borderRadius: '20px', boxShadow: "15px 10px 10px #86B049", marginRight: '2em', marginLeft: '2em', marginBottom: '3em' }} width="550" height="400" src="https://charts.mongodb.com/charts-project-0-wouny/embed/charts?id=631d21eb-2840-49e9-8fca-8634b9c9f832&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
            <iframe style={{ background: '#FFFFFF', borderRadius: '20px', boxShadow: "15px 10px 10px #86B049", marginRight: '2em', marginLeft: '2em', marginBottom: '3em' }} width="550" height="400" src="https://charts.mongodb.com/charts-project-0-wouny/embed/charts?id=631d32f5-e69b-462c-8c9e-adfbf226829b&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>
            <iframe style={{ background: '#FFFFFF', borderRadius: '20px', boxShadow: "15px 10px 10px #86B049", marginRight: '2em', marginLeft: '2em', marginBottom: '3em' }} width="550" height="400" src="https://charts.mongodb.com/charts-project-0-wouny/embed/charts?id=631d2f01-180c-4c4d-8263-fec7a9636b69&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>


        </div>
    );
}

export default Stats;