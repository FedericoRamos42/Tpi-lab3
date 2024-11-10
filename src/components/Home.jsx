import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import imgMain1 from '../assets/Main1.jpg';
import imgMain2 from '../assets/Main2.jpg';
import imgMain3 from '../assets/Main3.jpg';


export default function Home() {
  const imageClasses = 'w-full h-[700px] object-cover'; // Ajusta la altura y otras propiedades aquí
  const overlayClasses = 'absolute inset-0 bg-black opacity-40'; // Superposición de contraste oscuro

  return (
    <MDBCarousel showIndicators showControls fade>
      <MDBCarouselItem itemId={1} className="relative">
        <img src={imgMain1} className={`${imageClasses}`} alt="..." />
        <div className={overlayClasses}></div>
        <MDBCarouselCaption>
          <h5>Atención Médica Integral</h5>
          <p>Ofrecemos una amplia gama de servicios médicos para cuidar de tu salud y la de tu familia.</p>
        </MDBCarouselCaption>
      </MDBCarouselItem>

      <MDBCarouselItem itemId={2} className="relative">
        <img src={imgMain2} className={`${imageClasses}`} alt="..." />
        <div className={overlayClasses}></div>
        <MDBCarouselCaption>
          <h5>Tecnología de Vanguardia</h5>
          <p>Equipados con la última tecnología para brindar diagnósticos precisos y atención de calidad.</p>
        </MDBCarouselCaption>
      </MDBCarouselItem>

      <MDBCarouselItem itemId={3} className="relative">
        <img src={imgMain3} className={`${imageClasses}`} alt="..." />
        <div className={overlayClasses}></div>
        <MDBCarouselCaption>
          <h5>Profesionales a tu Servicio</h5>
          <p>Un equipo de expertos comprometidos con tu bienestar en cada consulta y tratamiento.</p>
        </MDBCarouselCaption>
      </MDBCarouselItem>
    </MDBCarousel>
  );
}