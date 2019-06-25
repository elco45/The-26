import React from 'react';
import Styled, { keyframes } from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Element } from 'react-scroll';

const PlanWrapper = Styled.div`
  background-image: url(http://themesquared.com/tomato/wp-content/uploads/2015/12/bg4.png);
  height: auto;
  width: 100vw;
  max-height: 100%;
  max-width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const PageHeader = Styled.h1`
  color: white;
  opacity: 1;
  font-size: 35px;
  text-align: center;
  text-transform: capitalize;
  font-weight: 800;
  margin-top: 20px;
  margin-bottom: 10px;
  line-height: 1.1;
`;

const SubDescription = Styled.p`
  font-size: 24px;
  text-align: center;
  color: white;
`;

const UnderlineDiv = Styled.div`
  margin-bottom: 30px;
  &:after {
    content: "";
    display: block;
    position: relative;
    height: 3px;
    width: 113px;
    background-color: #f9c56a;
    margin: 0px auto;
  }
`;

const PlanTypeWrapper = Styled.div`
  background-color: white;
  @media (max-width: 768px) {
    max-width: 100%;
  }
  max-width: 80%;
  margin-bottom: 24px;
`;

const PlanContainer = Styled.div`
  margin: 24px;
`;

const PlanImage = Styled.img`
  width: 100%;
  height: auto;
  &:hover {
    transform: scale(1.1);
    transition: .4s;
    opacity: 1;
  }
`;

const ImageScaleWrapper = Styled.div`
  overflow: hidden;
`;

const PlanHeader = Styled.h1`
  &:after {
    content: "";
    display: block;
    position: relative;
    height: 3px;
    width: 113px;
    background-color: #f9c56a;
    margin: 0px;
  }
`;

const PlanDescription = Styled.p`
  font-family: "Lato", sans-serif;
  color: #666;
  font-size: 15px;
  font-weight: 400;
  line-height: 28px;
`;

const Plans = () => (
  <Element name="Plan">
    <PlanWrapper>
      <Container className="container d-flex h-100 flex-column">
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <UnderlineDiv>
              <PageHeader>Our Plans</PageHeader>
              <SubDescription>
                Little things make us best in town.
              </SubDescription>
            </UnderlineDiv>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-center">
            <PlanTypeWrapper>
              <ImageScaleWrapper>
                <PlanImage src="http://themesquared.com/tomato/wp-content/uploads/2015/12/thumb5.png" />
              </ImageScaleWrapper>
              <PlanContainer>
                <PlanHeader>Plan A</PlanHeader>
                <PlanDescription>
                  Aenean suscipit vehicula purus quis iaculis. Aliquam nec leo
                  nisi. Nam urna arcu, maximus eget ex nec, consequat
                  pellentesque enim. Aliquam tempor fringilla odio, vel
                  ullamcorper turpis varius eu.
                </PlanDescription>
              </PlanContainer>
            </PlanTypeWrapper>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-center">
            <PlanTypeWrapper>
              <ImageScaleWrapper>
                <PlanImage src="http://themesquared.com/tomato/wp-content/uploads/2015/12/thumb6.png" />
              </ImageScaleWrapper>
              <PlanContainer>
                <PlanHeader>Plan B</PlanHeader>
                <PlanDescription>
                  Aenean suscipit vehicula purus quis iaculis. Aliquam nec leo
                  nisi. Nam urna arcu, maximus eget ex nec, consequat
                  pellentesque enim. Aliquam tempor fringilla odio, vel
                  ullamcorper turpis varius eu.
                </PlanDescription>
              </PlanContainer>
            </PlanTypeWrapper>
          </Col>
        </Row>
      </Container>
    </PlanWrapper>
  </Element>
);

export default Plans;
