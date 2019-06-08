import React from 'react';
import Styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

const HeroWrapper = Styled.div`
  background-image: url(http://themesquared.com/tomato/wp-content/uploads/2015/12/bg2.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  height: 100vh;
  width: 100vw;
  max-height: 100%;
  max-width: 100%;
`;

const Logo = Styled.img`
  margin-bottom: 5%;
`;

const Header = Styled.h1`
  color: white;
  opacity: 1;
`;

const Hero = () => (
  <HeroWrapper>
    <Container className="container d-flex h-100">
      <Row className="justify-content-center align-self-center w-100">
        <Col xs={12} className="d-flex justify-content-center">
          <Logo src="http://themesquared.com/tomato/wp-content/uploads/2015/12/logo.png" />
        </Col>
        <Col xs={12}>
          <Header className="text-center">DELICIOUS FOOD</Header>
        </Col>
      </Row>
    </Container>
  </HeroWrapper>
);

export default Hero;
