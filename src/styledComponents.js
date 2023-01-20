import styled from '@emotion/styled';

export const Container = styled.div`
  background-color: #355070;
  min-height: 100vh;
  color: #eff1ed;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'header' 'controls' 'preview' 'download' 'history';

  @media only screen and (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      '. header header . '
      '. controls preview . '
      '. download download .'
      '. history history .';
  }
  padding: 1rem;
`;

export const Header = styled.section`
  text-align: center;
  display: grid;
  grid-area: header;
`;

export const Controls = styled.section`
  display: inline;
  grid-area: controls;
  label,
  input {
    display: block;
    width: 90%;
    margin: 4px 0;
  }
`;
export const Preview = styled.section`
  display: inline;
  text-align: center;
  grid-area: preview;
  img {
    max-width: 340px;
    object-fit: contain;
  }
`;

export const Download = styled.section`
  display: inline;
  grid-area: download;
`;

export const History = styled.section`
  display: inline;
  grid-area: history;
  table {
    width: 90%;
    text-align: center;
  }
`;

export const Button = styled.button`
  background-color: transparent;
  border: 2px solid #eff1ed;
  color: #eff1ed;
  border-radius: 2px;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  margin: 2rem auto 2rem auto;

  &:disabled {
    opacity: 0.2;
  }
`;
