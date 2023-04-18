import { Container, Row, Col, Button } from 'react-bootstrap';
import './Announcements.css'

const Announcements = ({ annArray }) => {
  return (  
    <Container>
      <h4 className="announcement-align">Announcements</h4>
      <div className="announcement-row">
        {annArray.map((announcement, id) => {
          return <div className="announcement-card" key={`${id}`}>
            <img className="announcement-image" src={announcement.image}/>
            <div className="announcement-text">{announcement.announcement}</div>
          </div>
        })}
      </div>
    </Container>
  );
}
 
export default Announcements;