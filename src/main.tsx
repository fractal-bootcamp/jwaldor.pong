import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import AppMulti from "./AppMulti.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/room/:roomName",
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <Route path="/:roomName" Component={App} /> */}
    {/* <Router location="/">
      <Routes>
        <Route path="/:roomName" element={<App />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router> */}
    <RouterProvider router={router} />
  </StrictMode>
);
