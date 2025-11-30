import React, { useState } from "react";
import styles from "./Form.module.css";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Login = () => {
  const [active, setActive] = useState(false);

  return (
    <div className={`${styles.container} ${active ? styles.active : ""}`} id="container">

      {/* SIGN UP */}
      <div className={`${styles.formContainer} ${styles.signUp}`}>
        <form>
          <h1>Create Account</h1>
          <div className={styles.socialIcons}>
            <a className={styles.icons}><FaGoogle className="text-red-500 text-xl"/></a>
            <a className={styles.icons}><FaFacebook className="text-blue-600 text-xl" /></a>
            <a className={styles.icons}><FaGithub className="text-gray-800 text-xl"/></a>
            <a className={styles.icons}><FaLinkedin className="text-blue-700 text-xl"/></a>
          </div>
          <span>Register with email</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Enter Email" />
          <input type="password" placeholder="Enter Password" />
          <button type="button">Sign Up</button>
        </form>
      </div>

      {/* SIGN IN */}
      <div className={`${styles.formContainer} ${styles.signIn}`}>
        <form>
          <h1>Sign In</h1>
          <div className={styles.socialIcons}>
            <a className={styles.icons}><FaGoogle className="text-red-500 text-xl"/></a>
            <a className={styles.icons}><FaFacebook className="text-blue-600 text-xl" /></a>
            <a className={styles.icons}><FaGithub className="text-gray-800 text-xl"/></a>
            <a className={styles.icons}><FaLinkedin className="text-blue-700 text-xl"/></a>
          </div>
          <span>Login with Email & Password</span>
          <input type="email" placeholder="Enter Email" />
          <input type="password" placeholder="Enter Password" />
          <a href="#">Forgot Password?</a>
          <button>Sign In</button>
        </form>
      </div>

      {/* TOGGLE PANEL */}
      <div className={styles.toggleContainer}>
        <div className={styles.toggle}>
          <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
            <h1>Welcome Back</h1>
            <p>Sign in with your email & password</p>
            <button className={styles.hidden} onClick={() => setActive(false)}>Sign In</button>
          </div>

          <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
            <h1>Hello Friend</h1>
            <p>Register to start your journey</p>
            <button className={styles.hidden} onClick={() => setActive(true)}>Sign Up</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
