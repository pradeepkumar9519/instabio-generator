import React, { useState } from "react";

const categories = ["Attitude", "Love", "Funny", "Motivational"];
const languages = ["English", "Hindi"];

export default function App() {
  const [category, setCategory] = useState("Attitude");
  const [language, setLanguage] = useState("English");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const generateBio = async () => {
    setLoading(true);
    setBio("");

    const prompt = `Generate 5 unique and cool Instagram bio lines in ${language} for the category "${category}". Keep it short and stylish.`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setBio(data.bio || "Failed to generate. Try again.");
    } catch (err) {
      setBio("Something went wrong.");
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bio);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Instagram Bio Generator</h1>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-xl"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded-xl"
        >
          {languages.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>

        <button
          onClick={generateBio}
          className="bg-black text-white p-3 rounded-2xl hover:bg-gray-800"
        >
          {loading ? "Generating..." : "Generate Bio"}
        </button>

        {bio && (
          <div className="mt-4 bg-white p-4 rounded-xl shadow text-sm relative">
            <pre className="whitespace-pre-wrap">{bio}</pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 text-xs text-blue-500"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
