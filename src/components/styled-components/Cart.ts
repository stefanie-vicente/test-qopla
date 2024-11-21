import styled from "styled-components";

export const Container = styled.div`
  border: 2px solid #777;
  background-color: #121212;
  color: #f5f5f5;
  padding: 16px;
  border-radius: 5px;
`;

export const SectionTitle = styled.h3`
  color: #e0e0e0;
`;

export const StyledButton = styled.button`
  background-color: #333;
  color: #f5f5f5;
  border: 1px solid #444;
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }

  &:active {
    background-color: #777;
  }
`;

export const PayButton = styled(StyledButton)`
  width: 100%;
  margin-top: 12px;
  background-color: #0066cc;

  &:hover {
    background-color: #004085;
  }
`;

export const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 12px;
`;

export const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Flavour = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #f5f5f5;
  margin: 0;
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px;

  button {
    background-color: #333;
    color: #f5f5f5;
    border: 1px solid #444;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    transition: background-color 0.3s;

    &:hover {
      background-color: #555;
    }

    &:active {
      background-color: #777;
    }

    &::after {
      content: attr(data-label);
      position: absolute;
      top: -24px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #444;
      color: #f5f5f5;
      font-size: 10px;
      padding: 2px 4px;
      border-radius: 5px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s;
    }

    &:hover::after {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const ModificationsList = styled.ul`
  margin: 8px 0 0;
  padding: 0;
  list-style: none;

  li {
    font-size: 12px;
    color: #cfcfcf;
    margin-bottom: 8px;
    display: flex;
    flex-direction: row;
  }

  .mod-details {
    font-size: 11px;
    color: #a8a8a8;
  }
`;

export const Footer = styled.div`
  margin-top: 16px;
  text-align: center;

  button {
    ${StyledButton}
    width: 100%;
    padding: 8px 16px;
  }
`;

export const Total = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
`;
