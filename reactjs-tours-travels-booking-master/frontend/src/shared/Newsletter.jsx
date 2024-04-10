import React, { useState } from 'react';
import './newsletter.css';
import { Container, Row, Col } from 'reactstrap';
import maleTourist from '../assets/images/male-tourist.png';

const NewsLetter = () => {
   const [email, setEmail] = useState('');
   const [error, setError] = useState('');

   const handleInputChange = (event) => {
      setEmail(event.target.value);
   };

   const handleSubscribe = () => {
      if (!email) {
         setError('Please enter an email address.');
         return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
         setError('Please enter a valid email address.');
         alert('Please enter a valid email address.');
         return;
      }

      setError('');
      alert('Thank you for subscribing!');
   };

   return (
      <section className='newsletter'>
         <Container>
            <Row>
               <Col lg='6'>
                  <div className="newsletter__content">
                     <h2>Subscribe now to get useful traveling information</h2>

                     <div className="newsletter__input">
                        <input type="email" placeholder='Enter your email' value={email} onChange={handleInputChange} />
                        <button className="btn newsletter__btn" onClick={handleSubscribe}>Subscribe</button>
                     </div>
                     {error && <p className="error">{error}</p>}
                     <p>Subscribe now for insider travel tips and destination guides, insider secrets, ensuring every adventure exceeds your wildest dreams.</p>
                  </div>
               </Col>
               <Col lg='6'>
                  <div className="newsletter__img">
                     <img src={maleTourist} alt="" />
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   );
};

export default NewsLetter;
