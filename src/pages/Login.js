import { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { createUserProfile } from "../firestoreUtils";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const navigate = useNavigate();

  /*** Email Login ***/
  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  /*** Google Login ***/
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await createUserProfile(result.user);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  /*** Phone Login ***/
  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );

    return window.recaptchaVerifier;
  };

  const handlePhoneLogin = async () => {
    try {
      const appVerifier = setupRecaptcha();
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      alert("OTP sent! Enter it below to verify.");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      if (!confirmationResult) return alert("Please request OTP first");
      const result = await confirmationResult.confirm(otp);
      await createUserProfile(result.user);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {/* Email/Password */}
      <h3>Email Login</h3>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleEmailLogin}>Login with Email</button>

      {/* Google */}
      <h3>Google Login</h3>
      <button onClick={handleGoogleLogin}>Login with Google</button>

      {/* Phone */}
      <h3>Phone Login</h3>
      <input placeholder="+91xxxxxxxxxx" value={phone} onChange={e => setPhone(e.target.value)} />
      <div id="recaptcha-container"></div>
      <button onClick={handlePhoneLogin}>Send OTP</button>

      {confirmationResult && (
        <>
          <input placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default Login;
