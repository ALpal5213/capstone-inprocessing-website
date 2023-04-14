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
  const [style, setStyle] = useState(false);
  const [marker, setMarker] = useState(null);

  // console.log(selectedLocation);

  const handleHome = () => {
    map.current.flyTo({
      center: [selectedLocation.longitude, selectedLocation.latitude],
      zoom: 16,
      bearing: 0,
      pitch: 0,
      essential: true
    });
  }

  //create map
  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: style ? 'mapbox://styles/mapbox/navigation-night-v1' : 'mapbox://styles/mapbox/outdoors-v12',
      center: [-84.0537, 39.8137],
      zoom: 11
    })
    .addControl(new mapboxgl.FullscreenControl(), 'top-right')
    .addControl(new mapboxgl.NavigationControl(), 'top-right')

  }, [style]);

  // map fly to location
  useEffect(() => {
    if (!selectedLocation) return;

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
  }, [selectedLocation, style])

  const changeStyle = (e) => {
    e.preventDefault();
    setStyle(!style);
  }

  return (
    <Container className='map-wrapper'>
      <Row>
        <button onClick={() => handleHome()} className='reset-btn'>Return to Location</button>
      </Row>
      <Row className='justify-content-center'>
        <div ref={mapContainer} className="map-container" />
      </Row>
      <Row>
        <Col>
          <Button onClick={changeStyle} variant='primary' className='style-btn'>Change Theme</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Map;