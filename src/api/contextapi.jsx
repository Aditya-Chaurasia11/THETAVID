import { ethers } from "ethers";
import React, { createContext, useState, useContext, useEffect } from "react";
import TwitterContract from "../abi";

const Web3Context = createContext();

export const Web3provider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const loadProvider = async () => {
        if (provider) {
          // window.ethereum.on("chainChanged", () => {
          //   // Chain has changed, so reload the page
          //   window.location.reload();
          // });

          window.ethereum.on("accountsChanged", () => {
            // Accounts have changed, so reload the page
            window.location.reload();
          });

          await provider.send("eth_requestAccounts");
          const signer = await provider.getSigner();
          const address = await signer.getAddress();

          // Check if the current network is Sepolia (chainId: 0xaaa)
          const network = await provider.getNetwork();
          if (network.chainId !== 0x16d) {
            try {
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x16d" }], // Sepolia chainId
              });
            } catch (switchError) {
              if (switchError.code === 4902) {
                alert(
                  "Theta network not available in your MetaMask. Please add it manually."
                );
              } else {
                console.error("Failed to switch network:", switchError);
              }
            }
          }

          setAccount(address);
          let contractAddress = "0x5e361260d2060cc1ed1b947c936a354cc87904a4";
          // let contractAddress = "0xe6FFB03A0d364302b48d06c79547d4a2Bde4735A";

          const contract = new ethers.Contract(
            contractAddress,
            TwitterContract,
            signer
          );

          setContract(contract);
          setProvider(provider);
        } else {
          alert("Metamask not installed");
        }
      };
      provider && loadProvider();
    } catch (error) {
      console.log(error);
    }
  }, [ account]);

  return (
    <Web3Context.Provider
      value={{
        account,
        setAccount,
        provider,
        setProvider,
        contract,
        setContract,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
