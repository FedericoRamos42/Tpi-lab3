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
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </MDBCarouselCaption>
      </MDBCarouselItem>

      <MDBCarouselItem itemId={2} className="relative">
        <img src={imgMain2} className={`${imageClasses}`} alt="..." />
        <div className={overlayClasses}></div>
        <MDBCarouselCaption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </MDBCarouselCaption>
      </MDBCarouselItem>

      <MDBCarouselItem itemId={3} className="relative">
        <img src={imgMain3} className={`${imageClasses}`} alt="..." />
        <div className={overlayClasses}></div>
        <MDBCarouselCaption>
          <h5>Third slide label</h5>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </MDBCarouselCaption>
      </MDBCarouselItem>
    </MDBCarousel>
  );
}