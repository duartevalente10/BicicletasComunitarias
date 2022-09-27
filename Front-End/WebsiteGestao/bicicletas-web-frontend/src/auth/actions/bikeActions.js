import React,{useEffect, useState}from 'react'
import axios from 'axios';
import { sessionService } from 'redux-react-session';
import Mapp from '../../pages/Mapp';


export default async function useBikeActions() {

    const response = await axios.get("https://server-comunity-bikes.herokuapp.com/bicicleta/")

    return(response.data) 
}
