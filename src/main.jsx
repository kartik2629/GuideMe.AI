import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip";
import Header from "./components/custom/Header";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Viewtrip from "./view-trip/[tripId]/index.jsx";
import MyTrips from "./my-trips";
import Footer from "./components/custom/Footer";
import Contact from "./components/custom/Contact";
import About from "./components/custom/About";
import Policy from "./components/custom/Policy";
import TermsOfService from "./components/custom/TermsOfService";
import Services from "./components/custom/Services";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/view-trip/:tripId",
    element: <Viewtrip />,
  },
  {
    path: "/my-trips",
    element: <MyTrips />,
  },
  {
    path: "/contact-us",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/policy",
    element: <Policy />,
  },
  {
    path: "/termOfService",
    element: <TermsOfService />,
  },
  {
    path: "/services",
    element: <Services />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode className="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-cyan-500 animated-gradient">
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
      <Footer />
    </GoogleOAuthProvider>
  </StrictMode>
);
