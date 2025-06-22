import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [{ path: "/", element: <HomePage /> }],
  },
]);

const App: React.FC = () => {
  const [loadingFirstTime, setLoadingFirstTime] = useState(true);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    const hasVisited = sessionStorage.getItem("visited");
    if (!hasVisited) {
      setTimeout(() => {
        setLoadingFirstTime(false);
        sessionStorage.setItem("visited", "true");
      }, 1000);
    } else {
      setLoadingFirstTime(false);
    }
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {loadingFirstTime ? (
        <div>Loading...</div>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
};

export default App;