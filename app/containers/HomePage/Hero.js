import React from 'react';
import Styled, { keyframes } from 'styled-components';
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

const DivWrapper = Styled.div`
  width:100vw;
  max-width:100%;
  min-width:100%;
`;

const Hero = () => (
  <HeroWrapper>
    <Container className="container d-flex h-100 flex-column">
      <DivWrapper className="row align-self-center my-auto">
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
      </DivWrapper>
    </Container>
  </HeroWrapper>
);

export default Hero;
