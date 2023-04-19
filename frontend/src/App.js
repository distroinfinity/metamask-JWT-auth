import "./App.css";
import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Web3 from "web3";

const TokenKey = "cachedJWTAuthToken";
const BASEURL = "http://localhost:3001/api";

function App() {
  // get user account address
  const [account, setAccount] = useState("");
  const [auth, setAuth] = useState({ auth: null });
  const [user, setUser] = useState({ user: null });

  async function getAccount() {
    // Check if Web3 is injected by the browser (MetaMask)
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);

      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0].toLowerCase());
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  }

  async function checkAuth() {
    // check if Access token is stored in localstorage
    const ls = window.localStorage.getItem(TokenKey);
    const auth = ls && JSON.parse(ls);
    console.log("local auth", auth);
    setAuth({ auth });
  }

  useEffect(() => {
    getAccount();
    checkAuth();
  }, []);

  async function handleSignup() {
    console.log("user does not exist");
    const response = await fetch(`${BASEURL}/users`, {
      body: JSON.stringify({ publicAddress: account.toLowerCase() }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data = await response.json();
    console.log("new user created", data);
    return data;
  }
  const handleSignMessage = async (user) => {
    setUser({ user });
    const { publicAddress, nonce } = user;
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

    try {
      const signature = await web3?.eth.personal.sign(
        `nonce: ${nonce}`,
        publicAddress,
        "" // MetaMask will ignore the password argument here
      );
      console.log("signed message from", publicAddress, signature);
      return { publicAddress, signature };
    } catch (err) {
      throw new Error("You need to sign the message to be able to log in.");
    }
  };

  async function handleAuthenticate({ publicAddress, signature }) {
    const response = await fetch(`${BASEURL}/auth`, {
      body: JSON.stringify({ publicAddress, signature }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data = await response.json();
    return data;
  }

  async function getUser() {
    const userResponse = await fetch(
      `${BASEURL}/users?publicAddress=${account}`
    );
    const users = await userResponse.json();
    console.log("checking user exists", users);
    return users;
  }

  async function login() {
    try {
      // check if already present in the backend
      const users = await getUser();
      // fetch if present else create it.
      const user = users.length ? users[0] : await handleSignup();
      // sign message
      const signedMessage = await handleSignMessage(user);
      // Send signature to /auth route
      const accessToken = await handleAuthenticate(signedMessage);
      console.log("access token fetched", accessToken);
      
      // setToken(accessToken.accessToken); // save it in localStorage
      localStorage.setItem(TokenKey, JSON.stringify(accessToken.accessToken));
      setAuth({ auth });
    } catch (error) {
      window.alert(error);
    }
  }

  async function logOut() {
    localStorage.removeItem(TokenKey);
    setAuth({ auth: undefined });
    setUser({ user: null });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Injected wallet address {account}</p>
        <div>
          {auth.auth ? (
            <>
              <Button colorScheme="blue" onClick={logOut}>
                Logout
              </Button>
              <p>Successfully logged in!</p>
              {!user.user ? (
                ""
              ) : (
                <>
                  <p>id: {user?.user.id}</p>
                  <p>nonce: {user?.user.nonce}</p>
                  <p>publicAddress: {user?.user.publicAddress}</p>
                  <p>updated at: {user?.user.updatedAt} </p>
                </>
              )}
            </>
          ) : (
            <>
              <Button colorScheme="blue" onClick={login}>
                Login with metamask
              </Button>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
