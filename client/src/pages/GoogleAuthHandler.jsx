import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function GoogleAuthHandler() {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // OPTIONAL: You can fetch /api/auth/me to load user profile
      // but since token is valid we can instantly redirect:
      navigate("/app", { replace: true });
    }
  }, [search, navigate]);

  return <div style={{ padding: 40 }}>Signing you in…</div>;
}
