import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main className="flex flex-col items-center mt-3">
            <div className="mt-6 pt-7 pb-12 text-4xl">
                <h1>MyTry</h1>
            </div>
            <div className="mt-4 pt-4 pb-4 text-xl">
                <p className="pb-4">
                    Save here all the restaurants, cafes, bars, and sites you want to try and vist
                </p>
                <p>Find what you have saved near you on your night out</p>
            </div>
            <div className="flex flex-row space-x-7 mt-4 pt-4 text-xl">
                <Link to="/login">Login</Link>
                <Link to="/sign-up">Sign Up</Link>
            </div>
            <p className="mt-12 pt-11">** Improved CSS coming soon :) **</p>
        </main>
    );
};
export default Home;
