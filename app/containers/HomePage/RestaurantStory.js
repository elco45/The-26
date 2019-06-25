import React from 'react';
import Styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Element } from 'react-scroll';

const PageHeader = Styled.h1`
  color: black;
  opacity: 1;
  font-size: 35px;
  text-align: center;
  text-transform: capitalize;
  font-weight: 800;
  margin-top: 20px;
  margin-bottom: 10px;
  line-height: 1.1;
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

const SubDescription = Styled.p`
  font-size: 24px;
  text-align: center;
`;

const ColNoPadding = Styled.div`
  padding: 5px!important;
`;

const Image = Styled.img`
  width: 100%!important;
  max-width: 100%!important;
`;

const AboutRestaurant = Styled.p`
  font-size: 20px;
  color: #666;
  font-weight: 300;
  line-height: 33px;
`;

const RestaurantStory = () => (
  <Element name="RestaurantStory">
    <Container
      style={{
        marginTop: '25px',
        marginBottom: '25px',
      }}
    >
      <Row>
        <Col xs={12} className="d-flex justify-content-center">
          <UnderlineDiv>
            <PageHeader>The Restaurant</PageHeader>
            <SubDescription>
              A little about us and a brief history of how we started.
            </SubDescription>
          </UnderlineDiv>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <Container className="container d-flex h-100 flex-column">
            <Row>
              <ColNoPadding className="col-12 d-sm-none d-md-block">
                <Image
                  className="img-fluid"
                  src="http://themesquared.com/tomato/wp-content/uploads/2015/12/thumb1.png"
                  alt=""
                />
              </ColNoPadding>
              <ColNoPadding className="col-sm-6 d-none d-sm-block">
                <Image
                  className="img-fluid"
                  src="http://themesquared.com/tomato/wp-content/uploads/2015/12/thumb2.png"
                  alt=""
                />
              </ColNoPadding>
              <ColNoPadding className="col-sm-6 d-none d-sm-block">
                <Image
                  className="img-fluid"
                  src="http://themesquared.com/tomato/wp-content/uploads/2015/12/thumb3.png"
                  alt=""
                />
              </ColNoPadding>
            </Row>
          </Container>
        </Col>
        <Col xs={12} md={8}>
          <AboutRestaurant>
            Cras ut viverra eros. Phasellus sollicitudin sapien id luctus
            tempor. Sed hend rerit inter dum sagittis. Donec nunc lacus, dapibus
            nec interdum eget, ultrices eget justo. Nam purus lacus, efficitur
            eget laoreet sed, finibus nec neque. Cras eget enim in diam dapibus
            sagittis. In massa est, dignissim in libero ac, fringilla ornare mi.
            Etiam interdum ligula purus.
          </AboutRestaurant>
          <AboutRestaurant>
            Ultrices eget justo. Nam purus lacus, efficitur eget laoreet sed,
            finibus nec neque. Cras eget enim in diam dapibus sagittis. In massa
            est, dignissim in libero ac, fringilla ornare.
          </AboutRestaurant>
        </Col>
      </Row>
    </Container>
  </Element>
);

export default RestaurantStory;
