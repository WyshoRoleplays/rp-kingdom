import React from "react";

export default function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-indigo-900 text-white p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to RP Kingdom</h1>
        <p className="text-lg mb-6 max-w-xl">
          A home for roleplayers of all kinds. Choose your realm—General Chat, Anime, Romance, or Adventure. Personalize your profile. Dive into story.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-purple-800 font-semibold px-6 py-2 rounded-2xl shadow-lg hover:bg-gray-100 transition">
            Enter the Realm
          </button>
          <button className="bg-transparent border border-white text-white font-semibold px-6 py-2 rounded-2xl hover:bg-white hover:text-purple-800 transition">
            Customize Profile
          </button>
        </div>
      </div>
    </main>
  );
}