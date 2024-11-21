import styled from "styled-components";

export const Page = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr 2fr 2fr 2fr 4.5fr;
  grid-template-rows: repeat(5, 1fr);
  gap: 0px;
  height: 90vh;
  background-color: #121212;

  @media (aspect-ratio: 4/3) {
    grid-template-columns: 1fr 2fr 2fr 2fr 2fr 3fr;
    grid-template-rows: repeat(5, 1fr);
  }

  @media (aspect-ratio: 16/9) {
    grid-template-columns: 1fr 2.5fr 2.5fr 2.5fr 2.5fr 3.5fr;
    grid-template-rows: repeat(5, 1fr);
  }
`;

export const LeftBar = styled.div`
  grid-column: 1;
  grid-row: span 5 / span 5;
  background-color: #1e1e1e;
  padding: 16px;
  border-radius: 5px;
  background-color: #1e1e1e;
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.5);
`;

export const TopBar = styled.div`
  grid-column: 2 / span 4;
  grid-row: span 1 / span 4;
  grid-column-start: 2;
  grid-row-start: 1;
  background-color: #1e1e1e;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
`;

export const Options = styled.div`
  grid-column: 2 / span 4;
  grid-row: span 4 / span 4;
  grid-column-start: 2;
  grid-row-start: 2;
  background-color: #1e1e1e;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
`;

export const RightBar = styled.div`
  grid-row: span 5 / span 5;
  background-color: #1e1e1e;
  padding: 16px;
  box-shadow: -4px 0 6px rgba(0, 0, 0, 0.5);
`;
