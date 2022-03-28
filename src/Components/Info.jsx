import { Col, Container, Row } from "reactstrap";
import { TokenAddress } from "../Config/Constants.js";

function Info() {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Important Links</h2>
          <ul>
            <li>
              Visit the{" "}
              <a
                href="https://testnet.dynoscan.io/"
                target="_blank"
                rel="noreferrer"
              >
                Testnet Explorer
              </a>
            </li>
            <li>
              Download{" "}
              <a
                href="https://metamask.io/download"
                target="_blank"
                rel="noreferrer"
              >
                MetaMask
              </a>
            </li>
            <li>
              View Token on{" "}
              <a
                href={`https://testnet.dynoscan.io/token/${TokenAddress}/token-transfers`}
                target="_blank"
                rel="noreferrer"
              >
                Dyno Testnet
              </a>
            </li>
            <li>
              Visit the{" "}
              <a
                href="https://docs.dynoprotocol.com/#/en-us/"
                target="_blank"
                rel="noreferrer"
              >
                Documentation{" "}
              </a>
              on Metamask
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Info;
