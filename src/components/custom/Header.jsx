import { useEffect, useState } from "react";
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

import "../../../public/a.css";
import { FcGoogle } from "react-icons/fc";

import { auth, provider, signInWithPopup, signOut } from "../../service/firebaseConfig";

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;
      const formattedUser = {
        name: userData.displayName,
        email: userData.email,
        picture: userData.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(formattedUser));
      setUser(formattedUser);
      setOpenDialog(false);
    } catch (error) {
      console.error("Firebase login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Sign-out error:", error);
    }
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
                onClick={loginWithGoogle}
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
