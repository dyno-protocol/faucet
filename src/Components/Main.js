import { Container, Row, Col } from "reactstrap";
import styledComponents from "styled-components";
import Faucet from "./Faucet";
import Info from "./Info";

function Main() {
  return (
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
          <Info />
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
