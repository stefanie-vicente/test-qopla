import styled from "styled-components";

export const Page = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr 2.5fr 2.5fr 2.5fr 3.5fr;
  grid-template-rows: repeat(5, 1fr);
  gap: 0px;
  height: 90vh;

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
  background-color: #f4f4f4;
`;

export const TopBar = styled.div`
  grid-column: 2 / span 4;
  background-color: #ccc;
`;

export const Options = styled.div`
  grid-column: 2 / span 4;
  grid-row: span 4 / span 4;
  grid-column-start: 2;
  grid-row-start: 2;
  background-color: #ddd;
`;

export const RightBar = styled.div`
  grid-column: 6;
  grid-row: span 5 / span 5;
  background-color: #eaeaea;
`;
