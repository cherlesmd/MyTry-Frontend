import { Route, Routes } from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import Login from "./components/login/Login";
import Dash from "./components/dash/Dash";
import RequireAuth from "./components/auth/RequireAuth";
import MainOutlet from "./components/MainOutlet";
import PersistLogin from "./components/persistent/PersistLogin";
import Home from "./components/home/Home";

function App() {
    return (
        <Routes>
            <Route path="sign-up" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Home />} />

            <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                    <Route element={<MainOutlet />}>
                        <Route path="dash/*" element={<Dash />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
