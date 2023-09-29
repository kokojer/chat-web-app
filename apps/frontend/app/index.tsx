import { Button } from "antd";
import { useState } from "react";
import styled from "styled-components";
import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.css";
import { withProviders } from "./providers/withProviders.tsx";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button type="primary">Button</Button>
      <StyledButton>efwf</StyledButton>
    </>
  );
};

const AppWithProviders = withProviders(App);

export default AppWithProviders;

const StyledButton = styled.button`
  color: ${(props) => props.theme.antd.colorPrimary};
`;
