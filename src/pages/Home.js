// src/pages/Home.js
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome {user ? user.email || user.phoneNumber : "Guest"}</h2>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <p>Please login or signup to see full features.</p>
      )}
    </div>
  );
}

export default Home;
