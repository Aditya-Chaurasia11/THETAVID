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
          window.ethereum.on("chainChanged", () => {
            // Chain has changed, so reload the page
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            // Accounts have changed, so reload the page
            window.location.reload();
          });

          await provider.send("eth_requestAccounts");
          const signer = await provider.getSigner();
          const address = await signer.getAddress();

          setAccount(address);
          let contractAddress = "0xe6FFB03A0d364302b48d06c79547d4a2Bde4735A";
          // let contractAddress = "0xD5EE9Dc3Fe7E2BfEbfa5c79A9467270d2873a9A1";

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
  }, [provider, account, contract]);

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
