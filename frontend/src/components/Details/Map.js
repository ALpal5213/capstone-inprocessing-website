import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Map.css'

// public access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxwYWw1MjEzIiwiYSI6ImNsZ2U3aDNzZzJoeDUzZWxpMHlzNHdseGkifQ.0SJDwmo3e81ANVKxx-nQ1A';

// Change input argument to selectedLocation for final
const Map = ({ selectedLocation }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [locations, setLocations] = useState(null);
  const [style, setStyle] = useState(false);
  const [marker, setMarker] = useState(null);

  const handleHome = () => {
    map.current.flyTo({
      center: [-84.0537, 39.8137],
      zoom: 12,
      bearing: 0,
      pitch: 0,
      essential: true
    });
  }

  //useEffect to get locations from server.
  useEffect(() => {
    fetch('http://localhost:3001/table/Locations')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(error => console.log("Error fetching data: ", error))
  }, []);

  //create map
  useEffect(() => {
    if (!mapContainer.current || !locations) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: style ? 'mapbox://styles/mapbox/navigation-night-v1' : 'mapbox://styles/mapbox/outdoors-v12',
      center: [-84.0537, 39.8137],
      zoom: 12
    })
      .addControl(new mapboxgl.FullscreenControl(), 'top-right')
      .addControl(new mapboxgl.NavigationControl(), 'top-right')


  }, [locations, style]);

  // map fly to launch site when launch selected on home page
  useEffect(() => {
    if (!selectedLocation || !locations) return;

    map.current.flyTo({
      center: [selectedLocation.longitude, selectedLocation.latitude],
      zoom: 16,
      duration: 0,
      bearing: 0,
      pitch: 0,
      essential: true
    });

    // clear previous map markers
    if(marker) {marker.remove();}
    
    setMarker(new mapboxgl.Marker({ draggable: false })
      .setLngLat([selectedLocation.longitude, selectedLocation.latitude])
      .setPopup(new mapboxgl.Popup().setText(`${selectedLocation.building}`))
      .addTo(map.current))
  }, [selectedLocation])

  const changeStyle = (e) => {
    e.preventDefault();
    setStyle(!style);
  }

  return (
    <Container className='py-2 map-wrapper'>
      <Row className='justify-content-center'>
        <div ref={mapContainer} className="map-container" />
      </Row>
      <Row>
        <Col>
          <Button onClick={() => handleHome()} variant='success' className='reset-btn'>Home</Button>
        </Col>
        <Col>
          <Button onClick={changeStyle} variant='primary' className='style-btn'>Change Theme</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Map;