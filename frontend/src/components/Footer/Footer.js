import React, {useContext} from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { GlobalContext } from '../../App';
import './Footer.css'

export const Footer = () => {
  const { userLogin } = useContext(GlobalContext);


    return (
    <>
      {userLogin && <MDBFooter  className='text-center text-lg-start text-gray'>
          <section className='d-flex justify-content-center justify-content-lg-between p-4 '>
            <div className='me-5 d-none d-lg-block'>
            <a href='' className='me-4 text-reset'>
              {/* <img src="./inpro-logo.png" className="me-3" width="70px"/> */}
              <img src="./inpro.png" className="me-3" width="70px"/>
                   {/* In.Pro */}
              </a>
            </div>
    
          </section>
    
          <section className=''>
            <MDBContainer className='text-center text-md-start mt-5'>
              <MDBRow className='mt-3'>
                <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                  <h5 className='text-uppercase fw-bold mb-4'>
                  <MDBIcon fab icon="github" />
                  </h5>
                  <p>
                  <strong>Wright-Patterson Air Force Base</strong> is located northeast of Dayton, Ohio, and encompasses
                  parts of Greene and Montgomery counties. The base has a rich aviation heritage. 
                  The pioneering work of Orville and Wilbur Wright from 1899 to 1903 enabled them to 
                  achieve the first manned, powered flight.
              </p>
                </MDBCol>
    
                
    
                <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                  <p>
                    <a href='https://www.wpafb.af.mil/' target="_blank" className='text-reset'>
                      Wright-Patterson AFB
                    </a>
                  </p>
                  <p>
                    <a href='https://www.resilience.af.mil/' target='_blank' className='text-reset'>
                      Suicide Preventoin
                    </a>
                  </p>
                  <p>
                    <a href='https://www.wpafb.af.mil/Welcome/Connect-Club/' target='_blank' className='text-reset'>
                      Connect Club
                    </a>
                  </p>
                  <p>
                    <a href='https://www.wpafb.af.mil/Portals/60/documents/Index/2021%20WPAFB%20Telephone%20Directory.pdf?ver=m0N4NNnLeI_DiXN580NqUg%3d%3d' target='_blank' className='text-reset'>
                      Phone Directory
                    </a>
                  </p>
                </MDBCol>
    
                <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                  <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                  <p>
                    <MDBIcon icon="home" className="me-2" />
                    Wright-Patterson AFB 45433, US
                  </p>
                  {/* <p>
                    <MDBIcon icon="envelope" className="me-3" />
                    info@example.com
                  </p> */}
                  <p>
                    <MDBIcon icon="phone" className="me-3" /> 937-257-1110
                  </p>
                  <p>
                    <MDBIcon icon="print" className="me-3" /> 937-555-1212
                  </p>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
    
          <div className='text-center p-4' style={{ }}>
            © 2023 Copyright: 
            <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
              In.Pro
            </a>
          </div>
      </MDBFooter>}
    </>
    )
}