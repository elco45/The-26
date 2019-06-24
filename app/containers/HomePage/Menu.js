import React from 'react';
import Styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

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
`;

const MenuTags = Styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const MenuHeaderSpan = Styled.span`
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  color: #999;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0px 20px;
  padding-bottom: 2px;
  padding-top: 5px;
  cursor: pointer;
  transition: all 0.5s ease;
  border-bottom: 3px solid transparent;
  letter-spacing: 1px;
  &.active{
    border-bottom: 3px solid #f9c56a;
  }
`;

const DottedDiv = Styled.div`
  display: block;
  border-top: dotted 2px #ccc;
  position: absolute;
  left: 0px;
  top: 15px;
  width: 100%;
  z-index: -1;
`;

const Price = Styled.span`
  float: right;
  padding-left: 10px;
  line-height: 19.8px;
  margin: 5px 0px;
  background: #FFF none repeat scroll 0% 0%;
  font-family: Lato;
  font-size: 22px;
  font-weight: 400;
`;

const DishName = Styled.h4`
  text-align: left;
  margin: 5px 0px;
  float: left;
  padding-right: 10px;
  display: inline;
  background: #fff;
  font-size: 17px;
  color: #000;
  font-weight: 700;
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
`;

const DishContainer = Styled.div`
  position: relative;
  z-index: 1;
`;

const DishDescription = Styled.p`
  font-size: 16px;
  text-transform: capitalize;
  font-weight: 400;
  font-family: "Lato", sans-serif;
  color: #666;
  line-height: 28px;
`;
const restaurantMenu = [
  {
    dishName: 'ENGLISH BREAKFAST',
    dishPrice: '$ 14.95',
    dishDescription: 'Pellentesque Enim. Aliquam Tempor',
    type: 'Breakfast',
  },
  {
    dishName: 'ENGLISH LUNCH',
    dishPrice: '$ 14.95',
    dishDescription: 'Pellentesque Enim. Aliquam Tempor',
    type: 'Lunch',
  },
  {
    dishName: 'ENGLISH DINNER',
    dishPrice: '$ 14.95',
    dishDescription: 'Pellentesque Enim. Aliquam Tempor',
    type: 'Dinner',
  },
  {
    dishName: 'ENGLISH SNACK',
    dishPrice: '$ 14.95',
    dishDescription: 'Pellentesque Enim. Aliquam Tempor',
    type: 'Snack',
  },
];

class Menu extends React.Component {
  state = {
    filterMenu: restaurantMenu,
    activeTabClassName: 'All',
  };

  handleChange(mealType) {
    const filterMenu = restaurantMenu.filter(
      item => item.type === mealType || mealType === 'All',
    );
    this.setState({ filterMenu, activeTabClassName: mealType });
  }

  render() {
    return (
      <Container
        style={{
          marginTop: '25px',
          marginBottom: '25px',
        }}
      >
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <UnderlineDiv>
              <PageHeader>Our Menu</PageHeader>
              <SubDescription>
                These fine folks trusted the award winning restaurant.
              </SubDescription>
            </UnderlineDiv>
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={11} className="d-flex justify-content-center">
            <MenuTags>
              <MenuHeaderSpan
                onClick={() => this.handleChange('All')}
                className={
                  this.state.activeTabClassName === 'All' ? 'active' : ''
                }
              >
                All
              </MenuHeaderSpan>
              <MenuHeaderSpan
                className={
                  this.state.activeTabClassName === 'Breakfast' ? 'active' : ''
                }
                onClick={() => this.handleChange('Breakfast')}
              >
                Breakfast
              </MenuHeaderSpan>
              <MenuHeaderSpan
                className={
                  this.state.activeTabClassName === 'Lunch' ? 'active' : ''
                }
                onClick={() => this.handleChange('Lunch')}
              >
                Lunch
              </MenuHeaderSpan>
              <MenuHeaderSpan
                className={
                  this.state.activeTabClassName === 'Dinner' ? 'active' : ''
                }
                onClick={() => this.handleChange('Dinner')}
              >
                Dinner
              </MenuHeaderSpan>
              <MenuHeaderSpan
                className={
                  this.state.activeTabClassName === 'Snack' ? 'active' : ''
                }
                onClick={() => this.handleChange('Snack')}
              >
                Snacks
              </MenuHeaderSpan>
            </MenuTags>
          </Col>
        </Row>
        <Row>
          {this.state.filterMenu.map(item => (
            <Col md={6} xs={11} key={item.type}>
              <DishContainer className="clearfix">
                <DishName>{item.dishName}</DishName>
                <Price>{item.dishPrice}</Price>
                <DottedDiv />
              </DishContainer>
              <DishDescription>{item.dishDescription}</DishDescription>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Menu;
