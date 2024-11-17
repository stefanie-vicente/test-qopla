import styled from "styled-components";

export const Page = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 0px;
`;

export const LeftBar = styled.div`
  grid-row: span 5 / span 5;
`;

export const TopBar = styled.div`
  grid-column: span 4 / span 4;
`;

export const Options = styled.div`
  grid-column: span 4 / span 4;
  grid-row: span 4 / span 4;
  grid-column-start: 2;
  grid-row-start: 2;
`;

export const RightBar = styled.div`
  grid-row: span 5 / span 5;
  grid-column-start: 6;
  grid-row-start: 1;
`;
