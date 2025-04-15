import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "./supabaseClient";

const Auth = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Attempt to get the current session
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("Error getting session:", error);
      } else {
        setSession(data?.session || null); // Ensure safe access to session
      }
      setLoading(false); // Finished loading
    });

    // Set up listener for auth state changes
    const listener = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session); // Update session state on auth changes
      }
    );

    // Cleanup the listener on component unmount
    return () => {
      if (listener && listener.unsubscribe) {
        listener.unsubscribe(); // For supabase v2.x
      } else if (typeof listener === "function") {
        listener(); // For supabase v1.x, the listener itself is the unsubscribe function
      }
    };
  }, []); // Only run on component mount

  if (loading) return <div>Loading...</div>;

  // If there is a session, render children; otherwise, redirect to login page
  return session ? children : <Navigate to="/login" />;
};

export default Auth;
