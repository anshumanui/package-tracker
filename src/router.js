
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { createGlobalStyle, styled } from 'styled-components';

import App from './components/App';
import Comparison from './components/Comparison';
import { colors, fonts } from './utils/constants';

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }, {
    path: "/comparison",
    element: <Comparison />,
  }
]);

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }

  body {
    margin: 0;
    font-family: ${fonts.primary};
    background-color: ${colors.background};
    box-sizing: border-box;
    line-height: 1.6;
    font-size: 1rem;
    color: ${colors.darkerGray};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h5 {
    font-family: ${fonts.secondary};
  }

  ul {
    padding-left: 0;
    list-style-type: none;
  }
`;

const Main = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 1rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${colors.primary};
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.h5`
  font-size: 1rem;
  color: ${colors.darkGray};
`;

function Router() {
  return (
    <Main>
      <GlobalStyle />
      <Header>
        <Title>Package Tracker</Title>
        <SubTitle>Track your project's package version</SubTitle>
      </Header>
      <RouterProvider router={routerConfig} />
    </Main>
  );
}

export default Router;