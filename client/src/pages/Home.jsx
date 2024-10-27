import React, { useEffect } from "react";
import hero from "../assets/hero.svg";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const profile = localStorage.getItem("profile");
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      navigate("/chat");
    }
  }, []);

  return (
    <div className="w-full bg-white px-2 md:px-0">
      <div className="flex flex-col container min-h-screen text-gray-900">
        <header className="w-full flex justify-between items-center p-4">
          <div className="flex gap-1 items-center">
            <p className="text-2xl md:text-3xl font-bold uppercase bg-gradient-to-r from-[#3886fe] via-orange-300 to-[#fb6307] inline-block text-transparent bg-clip-text">
              mernify
            </p>
          </div>
          <div>
            <button className="bg-[#3886fe] text-white px-4 py-2 rounded-lg mr-2">
              <Link to="/auth">Get Started</Link>
            </button>
            <button className="bg-[#3886fe] text-white px-4 py-2 rounded-lg">
              <Link to="/auth">Sign Up</Link>
            </button>
          </div>
        </header>
        <main className="flex flex-1 items-center justify-center py-8 ">
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
            <div className="md:w-1/2 mb-8 md:mb-0 w-full text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                <span className="  bg-gradient-to-r from-[#3886fe] via-orange-300 to-[#fb6307] inline-block text-transparent bg-clip-text">
                  mernify -
                </span>
                Effortless Messaging and Media Sharing with Friends
              </h1>
              <p className="text-lg md:text-2xl mb-8">
                mernify lets you easily send messages and media, keeping you
                connected with your friends in real-time.
              </p>
              <button className="bg-[#3886fe] text-white px-6 py-3 rounded-lg font-semibold">
                <Link to="/auth">Get Started</Link>
              </button>
            </div>
            <div className="md:w-1/2 w-full hidden md:block">
              <img src={hero} alt="Chat App" className="w-full rounded-lg " />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
