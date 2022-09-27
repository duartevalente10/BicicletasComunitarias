
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import 'mapbox-gl/dist/mapbox-gl.css';
/* eslint import/no-webpack-loader-syntax: off */
import {CardTitle} from "reactstrap";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoiZHVhcnRldmFsZW50ZSIsImEiOiJjbDdld3hmczcwNG9pM3JucmpsMjdyMmNiIn0.JMEODEz1nakY2KLeQOP0Qw';

const Maps = () => {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(13.404954);
  const [lat, setLat] = useState(52.520008);
  const [zoom, setZoom] = useState(9);
  var [data, setBicycles] = useState([]);

  const state = {
    lng: -8.412840,
    lat: 39.603700,
    zoom: 12

  }

  async function loadBikes() {
    const response = await axios.get("https://server-comunity-bikes.herokuapp.com/bicicleta/")
    console.log(response.data)
    const dataValue = (response.data)
    setBicycles([response.data])
    return dataValue
  }

  useEffect(() => {
    
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [state.lng, state.lat],
      zoom: state.zoom
    });

    loadBikes().then( data => {
      console.log(data)
      data.forEach((name) => {
        console.log(name)
        var marker = new mapboxgl.Marker()
          .setLngLat([name.longitude, name.latitude])
          .setPopup(new mapboxgl.Popup({ offset: 30 })
          .setHTML('<h1>' + name.name + '</h1>' + "Preço/min:     " + name.priceHour + '</br>' + "Disponibilidade:     " + name.available + '</br>' + "Minutos de uso:     " + name.hoursUsed))
          .addTo(map);
      })
    }
    )

  }, [state.lat, state.lng, state.zoom]);

  return (
    <div style={{height: "95%", width: "95%", paddingLeft: "100px", paddingBottom: "50px"}}>
      <CardTitle className="thead3">Bicicletas Disponíveis</CardTitle>
      {lng && lng && (
        <div style={{ height: "700px", width: "95%", borderRadius: "15px", boxShadow: "15px 10px 10px #86B049" }} ref={mapContainer} className="map-container" />
      )}
    </div>
  );
};

export default Maps;