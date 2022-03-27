import { Container, Row, Col } from "reactstrap";
import styledComponents from "styled-components";
import Faucet from "./Faucet";
import Info from "./Info";

function Main() {
  return (
    <Container>
      <Row>
        <Col className="col-4">
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
