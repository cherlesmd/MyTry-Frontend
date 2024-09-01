import { Link } from "react-router-dom";
import polaroid1 from "../../resources/polaroid1.png";
import polaroid2 from "../../resources/polaroid2.png";
import polaroid3 from "../../resources/polaroid3.png";
import polaroid4 from "../../resources/polaroid4.png";
import polaroid5 from "../../resources/polaroid5.png";
import polaroid6 from "../../resources/polaroid6.png";
import polaroid7 from "../../resources/polaroid7.png";
import polaroid9 from "../../resources/polaroid9.png";
import polaroid10 from "../../resources/polaroid10.png";

const Home = () => {
  return (
    <body className="mx-9 md:mx-52  box-border">
      <main className="font-inter flex flex-col  items-center mt-3">
        <div className="grid grid-cols-1 h-dvh md:h-[80vh] md:grid-cols-2 gap-28 md:gap-12 mb-8">
          <div className="mt-6 md:pt-7 flex flex-col justify-evenly">
            <div className=" mb-12 ">
              <h1 className="text-6xl font-bold">
                M
                <span className="flicker-effect" aria-hidden="true">
                  y
                </span>
                Try
              </h1>
            </div>
            <div className="mt-16 md:mt-6 md:pt-4 pb-4 text-xl leading-6">
              <p className="">
                Save in one place all the restaurants, cafes, bars, and places
                you want to try
              </p>
              <p>&#9978; &#128644; &#9749; &#127864; &#127836;</p>
              <p className="mt-5">
                Easily find what you have saved near you on your night out
              </p>
            </div>
            <div className="flex flex-row justify-between md:justify-start space-x-7 mt-4 pt-4 text-xl">
              <Link to="/login">
                <button className="bg-primary border-[#89c74c] border-2 py-2 px-5 rounded hover:rounded-3xl duration-300">
                  Login
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="bg-secondary border-[#7b74b3] border-2 py-2 px-5 rounded hover:rounded-3xl duration-300">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-6  relative h-[80vh]">
            <div className="container">
              <div className="card">
                <img src={polaroid9} width="200px" height="200px" alt="" />
              </div>
              <div className="card">
                <img src={polaroid10} width="200px" height="200px" alt="" />
              </div>
              <div className="card">
                <img src={polaroid7} width="200px" height="200px" alt="" />
              </div>
              <div className="card">
                <img src={polaroid6} width="200px" height="200px" alt="" />
              </div>
              <div className="card">
                <img src={polaroid5} width="200px" height="200px" alt="" />
              </div>
              <div className="card">
                <img src={polaroid4} width="200px" height="200px" alt="" />
              </div>
              <div className="card">
                <img src={polaroid3} width="200px" height="200px" alt="" />
              </div>
              <div className="card">
                <img src={polaroid2} width="200px" height="200px" alt="" />
              </div>
              <div className="card">
                <img src={polaroid1} width="200px" height="200px" alt="" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
};
export default Home;
