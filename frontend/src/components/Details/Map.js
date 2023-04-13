import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; 
import {Container, Row, Col, Button} from 'react-bootstrap';
import './Map.css'

// public access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxwYWw1MjEzIiwiYSI6ImNsZ2U3aDNzZzJoeDUzZWxpMHlzNHdseGkifQ.0SJDwmo3e81ANVKxx-nQ1A';

const selectedLocation = {
  latitude: 39.7827, 
  longitude: -84.1040, 
  building: 'National Museum of the United States Air Force', 
  room: 1, address: '1100 Spaatz St, Dayton, OH 45433', 
  phone_number: '937-255-3286', 
  hours: '9:00 a.m. –5 p.m. M-F', 
  url: 'https://www.nationalmuseum.af.mil/'
}

// Change input argument to selectedLocation for final
const Map = ({selectedLoc}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [locations, setLocations] = useState(null)

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
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-84.0537, 39.8137],
      zoom: 12
    })
    .addControl(new mapboxgl.FullscreenControl())
    .addControl(new mapboxgl.NavigationControl())

    const markers = locations.map(location => new mapboxgl.Marker({draggable: false})
      .setLngLat([location.longitude, location.latitude])
      .setPopup(new mapboxgl.Popup()
      .setText(`${location.building}`))
      .addTo(map.current))
    }, [locations]);

  // map fly to launch site when launch selected on home page
  useEffect(()=>{
    if(!selectedLocation || !locations) return;

    let ID = selectedLocation.id
    let copy = [...locations]
    let result = copy.filter(location => location.id===ID)

    map.current.flyTo({
      center: [selectedLocation.longitude, selectedLocation.latitude],
      zoom: 13,
      duration: 5000,
      bearing: 100,
      pitch: 75,
      essential: true
    });
  }, [selectedLocation])

  return (

    <Container className='py-2 map-wrapper'>
      <Row className='justify-content-center'>
        <div ref={mapContainer} className="map-container" />
      </Row>
      <Button onClick={()=>handleHome()}variant='light' className='reset-btn'>Home</Button>
    </Container>
      
  );
}
 
export default Map;