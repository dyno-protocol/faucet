import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button, Container, Row, Col } from "reactstrap";
import TokenAbi from "../Config/abi/erc20.json";
import FaucetAbi from "../Config/abi/faucet.json";
import { FaucetAddress, TokenAddress } from "../Config/Constants";
import { showAlert } from "./Alert";
import styledComponents from "styled-components";

const Faucet = (props) => {
  const [balance, setBalance] = useState();
  const [chainID, setChainID] = useState(null);
  const ethereum = window.ethereum;
  const provider = new ethers.providers.Web3Provider(ethereum);

  async function checkValidNetwork() {
    try {
      // @ts-ignore
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xF7F" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      // @ts-ignore
      if (switchError.code === 4902) {
        try {
          // @ts-ignore
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xF7F",
                chainName: "DYNO-TESTNET",
                nativeCurrency: {
                  name: "DYNO",
                  symbol: "DYNO", // 2-6 characters long
                  decimals: 18,
                },
                rpcUrls: ["https://tapi.dynoprotocol.com"],
                blockExplorerUrls: ["https://testnet.dynoscan.io"],
              },
            ],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
      else {
        alert("Network Switch Denied");
      }
    }
  }

  useEffect(() => {
    checkValidNetwork();
    // getBalance();
    ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
  }, []);

  async function getBalance() {
    if (typeof ethereum !== "undefined") {
      const { chainId } = await provider.getNetwork();
      setChainID(chainId);
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const contract = new ethers.Contract(TokenAddress, TokenAbi, provider);
      contract
        .balanceOf(account)
        .then((balance) => setBalance((balance / 10 ** 18).toString()))
        .catch((err) =>
          showAlert(
            "Unable to fetch balance, try switching the network",
            "error"
          )
        );
    } else {
      showAlert("Unable to connect to a Wallet", "error");
    }
  }

  async function faucet() {
    if (typeof ethereum !== "undefined") {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(FaucetAddress, FaucetAbi, signer);
      contract
        .extractToken()
        .then((res) => {
          console.log(res);
          showAlert("Transaction Successfull", "success");
          getBalance();
        })
        .catch((err) => {
          showAlert(err?.data?.message, "error");
        });
    } else {
      showAlert("Unable to connect to a Wallet", "error");
    }
  }

  async function showToken() {
    await checkValidNetwork();
    if (typeof ethereum !== "undefined") {
      provider.provider.sendAsync(
        {
          method: "metamask_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: TokenAddress,
              symbol: "tDYNO",
              decimals: 18,
              image:
                "https://dynoprotocol.com/wp-content/uploads/2022/03/coin.png",
            },
          },
          id: Math.round(Math.random() * 100000),
        },
        (err, added) => {
          console.log("provider returned", err, added);
        }
      );
    } else {
      showAlert("Unable to connect to a Wallet", "error");
    }
  }

  async function addNetwork() {
    if (typeof ethereum !== "undefined") {
      try {
        provider.provider.sendAsync({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xF7F",
              chainName: "DYNO Testnet",
              rpcUrls: ["https://tapi.dynoprotocol.com"],
              nativeCurrency: {
                name: "tDYNO",
                symbol: "tDYNO",
                decimals: 18,
              },
            },
          ],
        });
      } catch (addError) {
        console.log(addError);
      }
    } else {
      showAlert("Unable to connect to a Wallet", "error");
    }
  }

  return (
    <Container
      className="shadow p-4 rounded"
      style={{ border: "1px solid #44bd32", marginTop: "4rem", width: "60%" }}
    >
      <Row>
        <Col style={{ textAlign: "left" }}>
          <h5>Recieve tDYNO to your wallet</h5>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <h5>Balance: {balance ?? 0} tDYNO</h5>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-around mt-4">
          <StyledButton
            onClick={faucet}
            color="success"
            className="rounded-pill"
            disabled={balance > 15}
            outline
          >
            Request Token!
          </StyledButton>
          <StyledButton
            onClick={showToken}
            color="success"
            className="rounded-pill"
            outline
          >
            View Token in MetaMask
          </StyledButton>
          <StyledButton
            onClick={addNetwork}
            color="success"
            className="rounded-pill"
            disabled={chainID === 3967}
            outline
          >
            Add/Switch Network
          </StyledButton>
        </Col>
      </Row>
    </Container>
  );
};

export default Faucet;

const StyledButton = styledComponents(Button)`
	border-color: #44bd32;
	color: #44bd32;

	&:hover {
		background-color: #44bd32;
		color: #353b48;
	}
`;
