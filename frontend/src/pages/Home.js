import React, { useState } from 'react';
import bannerImage from '../images/banner.jpeg'; 
import dog1 from '../images/dog1.jpg';
import dog2 from '../images/dog2.jpg';
import dog3 from '../images/dog3.jpg';
import testimonial1 from '../images/perosn/m1.jpg';
import testimonial2 from '../images/perosn/m2.jpg';
import testimonial3 from '../images/perosn/m3.jpg';
import testimonial4 from '../images/perosn/m4.jpg';
import '../css/Home.css';
//import Cookies from 'js-cookie';

const HomePage = () => {

  const testimonials = [testimonial1, testimonial2,testimonial3,testimonial4];
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  return (
    <div className="homepage">
      <div className="banner" style={{ backgroundImage: `url(${bannerImage})`, height: '600px' }}>
        <div className="banner-content">
          <h1 className="banner-title">Descoperă iubirea cu un prieten necuvântător</h1>
          <p className="banner-description">La Dog Shelter, fiecare câine merită o casă. Adu un prieten în viața ta și vei primi mai mult decât te-ai fi putut aștepta.</p>
          <a href="/dogs" className="banner-button">Adoptă Acum</a>
        </div>
      </div>
      <div className="about">
        <h2 className="about-title">Despre Noi</h2>
        <p className="about-description">Bine ai venit la Dog Shelter - adăpostul unde se împletesc destine. Suntem o echipă dedicată îngrijirii, protecției și adopției câinilor fără stăpân. Misiunea noastră este să găsim cămine fericite și iubitoare pentru fiecare patruped care trece pragul adăpostului nostru.</p>
        <p className="about-contact">Pentru mai multe informații sau pentru a ne contacta, accesează pagina noastră de <a href="/contact" className="about-contact-link">Contact</a>.</p>
      </div>
      <div className="testimonials">
        <h2 className="testimonials-title">Povești de Succes</h2>
        <div className="testimonial">
          <img src={testimonials[currentTestimonialIndex]} alt={`Testimonial ${currentTestimonialIndex + 1}`} className="testimonial-image" />
          <p className="testimonial-text">{"DogShelter a fost o binecuvântare pentru mine și familia mea! Cu ajutorul lor, am găsit pe companionul perfect, Bella. Echipa lor dedicată și pasionată a făcut tot posibilul să ne potrivească cu un câine care să se potrivească perfect stilului nostru de viață. Bella aduce multă bucurie și fericire în casă și nu ne putem imagina viața fără ea. Suntem recunoscători că am găsit DogShelter și îi recomandăm cu căldură pe toți cei care caută un companion necuvântător!"}</p>
        </div>
        <button className="prev-button" onClick={handlePrevTestimonial}>{"<"}</button>
        <button className="next-button" onClick={handleNextTestimonial}>{">"}</button>
      </div>

      <div className="dog-images">
        <img src={dog1} alt="Dog 1" className="dog-image" />
        <img src={dog2} alt="Dog 2" className="dog-image" />
        <img src={dog3} alt="Dog 3" className="dog-image" />
      </div>
    </div>
  );
}

export default HomePage;
