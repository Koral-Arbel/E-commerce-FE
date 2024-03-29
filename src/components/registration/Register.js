import React, { useRef, useState, useEffect, Fragment } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Register.module.css";
import { createNewUser } from "../../services/api";
import { Link } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const fullAddressRef = useRef();
  const passwordRef = useRef();
  const confirmPwdRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const newUserBody = {
        username: user,
        password: pwd,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        fullAddress: fullAddress,
      };
      const response = await createNewUser(newUserBody);
      setSuccess(true);

      setUser("");
      setPwd("");
      setMatchPwd("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setFullAddress("");
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <Fragment>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to={"/login"}>Sign In</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? classes.errmsg : classes.offscreen}
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">
              First Name:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? classes.hide : classes.invalid}
              />
            </label>
            <input
              type="text"
              id="firstName"
              ref={firstNameRef}
              autoComplete="off"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && firstName && !validName
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </p>

            <label htmlFor="lastName">
              Last Name:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? classes.hide : classes.invalid}
              />
            </label>
            <input
              type="text"
              id="lastName"
              ref={lastNameRef}
              autoComplete="off"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && lastName && !validName
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </p>

            <label htmlFor="email">
              Email:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? classes.hide : classes.invalid}
              />
            </label>
            <input
              type="text"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && email && !validName
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </p>

            <label htmlFor="phone">
              Phone:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? classes.hide : classes.invalid}
              />
            </label>
            <input
              type="text"
              id="phone"
              ref={phoneRef}
              autoComplete="off"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && phone && !validName
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </p>

            <label htmlFor="fullAddress">
              Full Address:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? classes.hide : classes.invalid}
              />
            </label>
            <input
              type="text"
              id="fullAddress"
              ref={fullAddressRef}
              autoComplete="off"
              onChange={(e) => setFullAddress(e.target.value)}
              value={fullAddress}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && fullAddress && !validName
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </p>

            <label htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? classes.hide : classes.invalid}
              />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? classes.valid : classes.hide}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? classes.hide : classes.invalid}
              />
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={
                pwdFocus && !validPwd ? classes.instructions : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number, and a
              special character.
              <br />
              Allowed special characters: <span>!</span>{" "}
              <span aria-label="at symbol">@</span> <span>#</span>{" "}
              <span>$</span> <span>%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  validMatch && matchPwd ? classes.valid : classes.hide
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validMatch || !matchPwd ? classes.hide : classes.invalid
                }
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              ref={confirmPwdRef}
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch
                  ? classes.instructions
                  : classes.offscreen
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button disabled={!validName || !validPwd || !validMatch}>
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className={classes.line}>
              <Link to={"/login"}>Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </Fragment>
  );
};

export default Register;
