import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  Fragment,
} from "react";
import classes from "./Login.module.css";
import { authenticate } from "../../services/api";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userBody = {
        username: user,
        password: pwd,
      };
      const response = await authenticate(userBody);

      // אם יש צורך לעדכן את הסטייט רק אחרי ההצלחה של authenticate
      setAuth({ username: user, token: response.data.jwt, isLoggedIn: true });

      setSuccess(true);
      setUser("");
      setPwd("");
      localStorage.setItem(
        "auth",
        JSON.stringify({
          username: user,
          token: response.data.jwt,
          isLoggedIn: true,
        })
      );
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 403) {
        setErrMsg("Incorrect Username Or Password");
      } else {
        setErrMsg("Authentication Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <Fragment>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to={"/"}>Go to Home</Link>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? classes.error_mes : "offscreen"}>
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button type="submit" disabled={!user || !pwd}>
              Sign In
            </button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/signUp">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </Fragment>
  );
}

export default Login;
