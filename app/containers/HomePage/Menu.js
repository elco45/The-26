import React from 'react';
import Styled, { keyframes } from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

const FadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Logo = Styled.img`
  margin-bottom: 5%;
`;

const Header = Styled.h1`
  color: white;
  opacity: 1;
`;

const AnimationWrapper = Styled.div`
  animation: ${FadeIn} 3s linear;
`;

const Hero = () => (
  <Container className="container d-flex h-100 flex-column">
    <Row className="align-self-center my-auto">
      <Col xs={12} className="d-flex justify-content-center">
        <AnimationWrapper>
          <Logo src="http://themesquared.com/tomato/wp-content/uploads/2015/12/logo.png" />
        </AnimationWrapper>
      </Col>
      <Col xs={12}>
        <AnimationWrapper>
          <Header className="text-center">DELICIOUS FOOD</Header>
        </AnimationWrapper>
      </Col>
    </Row>
  </Container>
);

export default Hero;
