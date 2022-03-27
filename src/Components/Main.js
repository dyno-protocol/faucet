import { Container, Row, Col } from "reactstrap";
import styledComponents from "styled-components";
import { TokenAddress } from "../Config/Constants";
import Faucet from "./Faucet";
import Info from "./Info";

function Main() {
  return (
    <>
      <Container>
        <Row style={{ textAlign: "right" }}>
          <Col className="col-5">
            <h1>Testnet faucet for</h1>
          </Col>
          <Col className="col-1">
            <img src="/icons/logo-full.png" />
          </Col>
        </Row>

        <Row>
          <Col>
            <Faucet />
            {/* <Info /> */}
          </Col>
        </Row>
      </Container>
      <Footer>
        <div>
          <a
            href="https://testnet.dynoscan.io/"
            target="_blank"
            rel="noreferrer"
          >
            Testnet Explorer
          </a>
        </div>
        <div>
          <a
            href="https://metamask.io/download"
            target="_blank"
            rel="noreferrer"
          >
            MetaMask
          </a>
        </div>
        <div>
          <a
            href={`https://mumbai.polygonscan.com/address/${TokenAddress}`}
            target="_blank"
            rel="noreferrer"
          >
            Dyno Testnet
          </a>
        </div>
        <div>
          <a
            href="https://docs.dynoprotocol.com/#/en-us/"
            target="_blank"
            rel="noreferrer"
          >
            Documentation{" "}
          </a>
        </div>
      </Footer>
    </>
  );
}

export default Main;

const Footer = styledComponents.div`
  display: flex;
  justify-content: space-around;
  position: fixed;
  border-top: 1px solid #44bd32;
  bottom: 0;
  width: 100%;
  padding: 20px;

  div {
    a {
      color: #44bd32;
      text-decoration: none;
      padding: 4px;
      font-weight: bold;

      &:hover {
        color: #353b48;
        background-color: #44bd32;
        border-radius: 2px;
      }
    }
  }
`;
