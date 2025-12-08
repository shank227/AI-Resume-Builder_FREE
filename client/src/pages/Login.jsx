import React, { useState } from "react";
import styles from "./Form.module.css";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { loginUserAPI, registerUserAPI } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [active, setActive] = useState(false); // toggle animation

  // LOGIN states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // SIGN UP states
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Generic states
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // -------------------------------------------
  // LOGIN HANDLER
  // -------------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const res = await loginUserAPI({
      email: loginEmail,
      password: loginPassword,
    });

    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      navigate("/app");
    } else {
      setErrorMsg(res.message || "Login failed");
    }

    setLoading(false);
  };

  // -------------------------------------------
  // SIGNUP HANDLER
  // -------------------------------------------
  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (!signupName || !signupEmail || !signupPassword) {
      setErrorMsg("Please fill all fields.");
      setLoading(false);
      return;
    }

    if (signupPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const res = await registerUserAPI({
      name: signupName,
      email: signupEmail,
      password: signupPassword,
    });

    if (res.user) {
      // After signup → switch to login view
      setActive(false);
    } else {
      setErrorMsg(res.message || "Signup failed");
    }

    setLoading(false);
  };

  return (
    <div className={`${styles.container} ${active ? styles.active : ""}`}>

      {/* -------------------------------------------------
           SIGN UP FORM
      --------------------------------------------------- */}
      <div className={`${styles.formContainer} ${styles.signUp}`}>
        <form onSubmit={handleSignup}>
          <h1>Create Account</h1>

          <div className={styles.socialIcons}>
            <a className={styles.icons}><FaGoogle /></a>
            <a className={styles.icons}><FaFacebook /></a>
            <a className={styles.icons}><FaGithub /></a>
            <a className={styles.icons}><FaLinkedin /></a>
          </div>

          <span>Register with email</span>

          <input
            type="text"
            placeholder="Full Name"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            required
          />

          {errorMsg && active && (
            <p style={{ color: "red", fontSize: 12 }}>{errorMsg}</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>
      </div>

      {/* -------------------------------------------------
           SIGN IN FORM
      --------------------------------------------------- */}
      <div className={`${styles.formContainer} ${styles.signIn}`}>
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>

          <div className={styles.socialIcons}>
            <a className={styles.icons}><FaGoogle /></a>
            <a className={styles.icons}><FaFacebook /></a>
            <a className={styles.icons}><FaGithub /></a>
            <a className={styles.icons}><FaLinkedin /></a>
          </div>

          <span>Login with Email & Password</span>

          <input
            type="email"
            placeholder="Enter Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />

          {errorMsg && !active && (
            <p style={{ color: "red", fontSize: 12 }}>{errorMsg}</p>
          )}

          <a href="#">Forgot Password?</a>

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>

      {/* -------------------------------------------------
           TOGGLE PANELS
      --------------------------------------------------- */}
      <div className={styles.toggleContainer}>
        <div className={styles.toggle}>

          <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
            <h1>Welcome Back</h1>
            <p>Sign in with your email & password</p>
            <button
              className={styles.hidden}
              onClick={() => setActive(false)}
            >
              Sign In
            </button>
          </div>

          <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
            <h1>Hello Friend</h1>
            <p>Register to start your journey</p>
            <button
              className={styles.hidden}
              onClick={() => setActive(true)}
            >
              Sign Up
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
