import React from 'react';
import Styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Element } from 'react-scroll';

const FooterWrapper = Styled.div`
  background: url(http://themesquared.com/tomato/wp-content/uploads/2015/12/bg6.png) no-repeat center center;
  background-size: cover;
  padding: 4%;
`;

const Logo = Styled.img`
  margin-bottom: 5%;
  max-width: 300px;
`;

const InfoText = Styled.p`
  color: #fff;
  font-size: 16px;
`;

const Icon = Styled.i`
  color: #ff7149;
  font-size: 24px !important;
`;

const CenterWrapper = Styled.div`
  display: table;
  height: 100%;
`;

const CenterWrapperCell = Styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const SectionTitle = Styled.p`
  color: #ff7149;
  font-size: 24px;
  font-weight: bold;
`;

const SocialMediaAnchor = Styled.a`
  margin-left: 10px;
  margin-bottom: 10px;
  position:relative;
  text-align:center;
  width:0px;
  height:0px;
  padding:20px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  -moz-border-radius: 20px 20px 20px 20px;
  -webkit-border-radius: 20px 20px 20px 20px;
  -khtml-border-radius: 20px 20px 20px 20px;
  color:#FFFFFF;
  float:left;
  margin:0 5px 0 0;
  cursor:pointer;
  background: #fff;
  transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
  &:hover {
    background: #f9c56a;
  }
  &.fb > i {
    left: 13px;
    top: 10px;
  }
  &.in > i {
    left: 12px;
  }
`;

const SocialMediaIcon = Styled.i`
  color: #00588a;
  font-size:20px;
  position:absolute;
  left:9px;
  top:10px;
`;

const FooterCopyRight = Styled.div`
  text-align: center;
  background-color: #1c1c1e;
  color: #999;
`;

function renderSocialLink(link, socialMedia, icon) {
  return (
    <SocialMediaAnchor target="_blank" href={link} className={`${socialMedia}`}>
      <SocialMediaIcon className={icon} />
    </SocialMediaAnchor>
  );
}

const Footer = () => (
  <Element name="ContactUs">
    <FooterWrapper>
      <Container className="container d-flex h-100 flex-column">
        <Row>
          <Col md={4} xs={12} className="d-flex justify-content-center">
            <CenterWrapper>
              <CenterWrapperCell>
                <Logo src="http://themesquared.com/tomato/wp-content/uploads/2015/12/logo.png" />
              </CenterWrapperCell>
            </CenterWrapper>
          </Col>
          <Col md={4} xs={12}>
            <CenterWrapper>
              <CenterWrapperCell>
                <InfoText>
                  <Icon className="fa fa-envelope" /> <b>Email:</b>{' '}
                  meow@meow.com
                </InfoText>
                <InfoText>
                  <Icon className="fa fa-phone" /> <b>Phone:</b> 123-123-1234
                </InfoText>
                <InfoText>
                  <Icon className="fa fa-map-marker" /> 777 Boulevard Robert
                  Bourassa Suite #2612
                </InfoText>
              </CenterWrapperCell>
            </CenterWrapper>
          </Col>
          <Col md={4} xs={12}>
            <CenterWrapper>
              <CenterWrapperCell>
                <SectionTitle>Follow Us</SectionTitle>
                {renderSocialLink(
                  'https://google.com/',
                  'fb',
                  'fa fa-facebook',
                )}
              </CenterWrapperCell>
            </CenterWrapper>
          </Col>
        </Row>
      </Container>
    </FooterWrapper>
    <FooterCopyRight>
      <Container>
        <Row>
          <Col>
            <p>
              <i className="fa fa-copyright" /> {new Date().getFullYear()} The
              26th
            </p>
          </Col>
        </Row>
      </Container>
    </FooterCopyRight>
  </Element>
);

export default Footer;
