import styled from 'styled-components';

const Select = styled.select`
  line-height: 1em;
  background-color: transparent;
  border-style: none;
  color: #fff;
  cursor: pointer;

  :focus {
    outline: none;
  }

  option:not(:checked) {
    color: black;
    background-color: #fff;
  }
  option:checked {
    background-color: #007bff;
  }
`;

export default Select;
