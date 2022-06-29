import { useEffect, useState } from "react";
import axios from "axios";

const server = "http://localhost:5000";
// const server = "https://socifyserver.herokuapp.com";

export default function UseAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  useEffect(() => {
    axios
      .post(`${server}/auth/cred`, { code }) // server location
      .then((response) => {

        // If success then cut the code string from the URL and execute the other thing
        window.history.pushState({}, null, "/");

        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);

      })
      .catch(() => {
        //   If fail redirect to home page - Login page
        window.location = "/";
      });
  }, [code]);

  return [accessToken, refreshToken]
}