import { Col, Container, Row } from "reactstrap";
import {TokenAddress} from '../Config/Constants.js'

function Info() {
	return (
		<Container className="mt-5">
			<Row>
				<Col>
					<h2>Important Links</h2>
					<ul>
						<li>
							Visit the Testnet Explorer{" "}
							<a
								href="https://testnet.dynoscan.io/"
								target="_blank"
								rel="noreferrer"
							>
								Matic
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
								href={`https://mumbai.polygonscan.com/address/${TokenAddress}`}
								target="_blank"
								rel="noreferrer"
							>
								Polygon Scan
							</a>
						</li>
						<li>
							Documentation{" "}
							<a
								href="https://docs.dynoprotocol.com/#/en-us/"
								target="_blank"
								rel="noreferrer"
							>
								Polygon network{" "}
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
