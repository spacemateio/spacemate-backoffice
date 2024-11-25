import { useEffect, useState } from "react";

function DarkModeSwitch() {
  const [darkMode, setDarkMode] = useState(() => {
    // LocalStorage'dan kullanıcı tercihini yükle (Varsayılan: false)
    return localStorage.getItem("darkMode") === "true"; // String olarak okunur ve boolean olarak döner
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Kullanıcı tercihini string olarak LocalStorage'a kaydet
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default DarkModeSwitch;
