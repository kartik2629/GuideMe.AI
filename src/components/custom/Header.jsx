// src/components/custom/Header.jsx
import "../../../public/a.css";
import { Button } from "../ui/button";
import { LuLogOut } from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getUserProfile = async (tokenInfo) => {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setOpenDialog(false);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (response) => getUserProfile(response),
    onError: (error) => console.error("Login Failed:", error),
    scope: "profile email",
  });

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <div className="p-3 shadow-md flex justify-between items-center px-5 rounded-b-xl bg-gradient-to-r from-sky-200 via-yellow-100 to-lime-200 backdrop-blur-sm bg-opacity-60">
      <a href="/" className="hover:cursor-pointer">
        <img className="head-logo" src="/guidemeai.png" alt="Logo" />
      </a>

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="text-black rounded-full">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="text-black rounded-full">
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger className="bg-[#fff0] border-none">
                <img
                  src={user.picture || "/guidemeai.png"}
                  onError={(e) => {
                    e.currentTarget.src = "/guidemeai.png";
                  }}
                  className="h-[40px] w-[40px] rounded-full"
                  alt="User"
                />
              </PopoverTrigger>
              <PopoverContent>
                <div
                  onClick={handleLogout}
                  className="flex cursor-pointer justify-center gap-2 items-center"
                >
                  <LuLogOut /> Logout
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex justify-between items-center">
                <img src="/guidemeai.png" alt="Logo" className="head-logo" />
                <Button
                  className="h-10 w-10"
                  onClick={() => setOpenDialog(false)}
                >
                  X
                </Button>
              </div>
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in with Google authentication securely</p>
              <Button
                onClick={login}
                className="mt-5 w-full flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
