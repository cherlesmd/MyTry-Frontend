import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosConfig";
import AuthContext from "../auth/AuthPovider";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuth, persist, setPersist } = useContext(AuthContext);

  const handle_signup = async (e) => {
    e.preventDefault();
    try {
      if (!email || !username || !password) {
        setError("Fill in all Fields");
        return;
      }

      const response = await axiosInstance.post("/auth/register", {
        email,
        username,
        password,
      });
      console.log(response);

      setAuth(true);
      console.log(response.data);

      navigate("/dash");
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response ? error.response.data : error.message,
      );

      setError(error.response ? error.response.data : error.message);
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <main className="font-inter flex flex-col  items-center mt-3">
      <form className="auth-form">
        <div className="field">
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="input"
              placeholder=""
            />{" "}
            <label htmlFor="email" className="label">
              Email address
            </label>
          </div>
        </div>
        <div className="field">
          <input
            id="username"
            name="username"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            className="input"
            placeholder=""
          />
          <label htmlFor="username" className="label">
            Username
          </label>
        </div>
        <div className="field">
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="input"
            placeholder=""
          />
          <label htmlFor="password" className="label">
            Password
          </label>
        </div>
        <div className="persistCheck mt-5">
          <input
            type="checkbox"
            id="persist"
            className="accent-accent mr-1"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
        <div>
          <button
            type="submit"
            onClick={handle_signup}
            className="w-full my-5 border-b-primary border-t-background border-x-background border-b-2 py-2 px-5  hover:rounded-2xl hover:bg-primary  duration-500"
          >
            Sign Up
          </button>
        </div>
        <div className="flex flex-row justify-evenly items-center mt-9">
          <p className="text-sm">Already have an account?</p>
          <Link to="/login">
            <button className=" border-b-accent border-t-background border-x-background border-b-2 py-2 px-5  hover:rounded-2xl hover:bg-accent  duration-500">
              Sign in
            </button>
          </Link>
        </div>
      </form>
    </main>
  );
}
export default SignUp;
