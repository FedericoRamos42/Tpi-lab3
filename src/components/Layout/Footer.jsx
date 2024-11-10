import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted' >
      <section className=''>
        <MDBContainer className='text-center text-md-start mt-0 p-4'>
          <MDBRow className='mt-0'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='user-md' className='me-3' />
                Clinica UTN
              </h6>
              <p>
                Ofrecemos atención médica de calidad, con un equipo de profesionales dedicados a tu bienestar. Contáctanos para reservar una cita o conocer más sobre nuestros servicios.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Servicios</h6>
              <p>Consultas médicas generales</p>
              <p>Especialidades médicas</p>
              <p>Laboratorio de análisis clínicos</p>
              <p>Atención de urgencias</p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                Rosario, Santa Fe, Argentina
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                info@example.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href='#'>
          ClinicaUtn.com
        </a>
      </div>
    </MDBFooter>
  );
}