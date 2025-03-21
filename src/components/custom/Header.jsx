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

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    // console.log("user", user);
  }, []);

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        // console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <a href="/" className="hover:cursor-pointer">
        <img className="head-logo" src="/guidemeai.png" />
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/my-trips">
              <Button variant="outline" className="text-black rounded-full">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger className="bg-white border-none">
                <img
                  src={user?.picture || "/guidemeai.png"}
                  className="h-[40px] w-[40px] rounded-full"
                  alt="User"
                />
              </PopoverTrigger>
              <PopoverContent>
                <div
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
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
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex justify-between items-center">
                <img src="/guidemeai.png" alt="" className="head-logo" />
                <Button
                  className="h-10 w-10"
                  onClick={() => setOpenDialog(false)}
                >
                  X
                </Button>
              </div>
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in with google authentication securely</p>
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
