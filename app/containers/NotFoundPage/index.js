/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import Styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

const Wrapper = Styled.div`
  height: 100vh;
  width: 100vw;
`;
export default function NotFound() {
  return (
    <Wrapper>
      <Container className="container d-flex h-100">
        <Row className="justify-content-center align-self-center w-100">
          <Col xs={12} className="d-flex justify-content-center">
            <h1>Error 404! Not found</h1>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}
