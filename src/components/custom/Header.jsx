// import "../../../public/a.css";
// import { Button } from "../ui/button";
// import { LuLogOut } from "react-icons/lu";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
// } from "@/components/ui/dialog";

// import { useEffect, useState } from "react";
// import { FcGoogle } from "react-icons/fc";

// import { auth, provider, signInWithPopup, signOut } from "@/service/firebaseConfig";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// function Header() {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [user, setUser] = useState(null);
//    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const loginWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const userData = result.user;
//       const formattedUser = {
//         name: userData.displayName,
//         email: userData.email,
//         picture: userData.photoURL,
//       };
//       localStorage.setItem("user", JSON.stringify(formattedUser));
//       setUser(formattedUser);
//       setOpenDialog(false);
//     } catch (error) {
//       console.error("Firebase login error:", error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       localStorage.clear();
//       setUser(null);
//       window.location.href = "/";
//     } catch (error) {
//       console.error("Sign-out error:", error);
//     }
//   };

//   return (
//     <div className="p-3 shadow-md flex justify-between items-center px-5 rounded-b-xl bg-gradient-to-r from-sky-200 via-yellow-100 to-lime-200 backdrop-blur-sm bg-opacity-60">
//       <a href="/" className="hover:cursor-pointer">
//         <img className="head-logo" src="/guidemeai.png" alt="Logo" />
//       </a>

//       <div>
//         {user ? (
//           <div className="flex items-center gap-3">
//             <a href="/create-trip">
//               <Button variant="outline" className="text-black rounded-full">
//                 + Create Trip
//               </Button>
//             </a>
//             <a href="/my-trips">
//               <Button variant="outline" className="text-black rounded-full">
//                 My Trips
//               </Button>
//             </a>

//             <Popover>
//               <PopoverTrigger className="bg-[#fff0] border-none">
//                 <img
//                   src={user.picture || "/guidemeai.png"}
//                   onError={(e) => {
//                     e.currentTarget.src = "/guidemeai.png";
//                   }}
//                   className="h-[40px] w-[40px] rounded-full"
//                   alt="User"
//                 />
//               </PopoverTrigger>
//               <PopoverContent>
//                 <div
//                   onClick={handleLogout}
//                   className="flex cursor-pointer justify-center gap-2 items-center"
//                 >
//                   <LuLogOut /> Logout
//                 </div>
//               </PopoverContent>
//             </Popover>
//           </div>
//         ) : (
//           <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
//         )}
//       </div>

//       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogDescription>
//               <div className="flex justify-between items-center">
//                 <img src="/guidemeai.png" alt="Logo" className="head-logo" />
//                 <Button
//                   className="h-10 w-10"
//                   onClick={() => setOpenDialog(false)}
//                 >
//                   X
//                 </Button>
//               </div>
//               <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
//               <p>Sign in with Google authentication securely</p>
//               <Button
//                 onClick={loginWithGoogle}
//                 className="mt-5 w-full flex gap-4 items-center"
//               >
//                 <FcGoogle className="h-7 w-7" />
//                 Sign In with Google
//               </Button>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default Header;

import "../../../public/a.css";
import { Button } from "../ui/button";
import { LuLogOut, LuMenu } from "react-icons/lu";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import {
  auth,
  provider,
  signInWithPopup,
  signOut,
} from "@/service/firebaseConfig";

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div className="shadow-md bg-gradient-to-r from-sky-200 via-yellow-100 to-lime-200 backdrop-blur-sm bg-opacity-60 sticky top-0 z-50">
      <div className="container mx-auto p-3 flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <a href="/" className="hover:cursor-pointer flex-shrink-0">
          <img className="head-logo" src="/guidemeai.png" alt="Logo" />
        </a>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <LuMenu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white/90 backdrop-blur-md border-l flex flex-col gap-4 p-6 sm:p-8">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Navigate through the app.</SheetDescription>
              </SheetHeader>
              <a
                href="/create-trip"
                className="block py-2 px-4 rounded-md hover:bg-gray-100"
              >
                <Button
                  variant="outline"
                  className="w-full text-black rounded-full justify-center"
                >
                  + Create Trip
                </Button>
              </a>
              <a
                href="/my-trips"
                className="block py-2 px-4 rounded-md hover:bg-gray-100"
              >
                <Button
                  variant="outline"
                  className="w-full text-black rounded-full justify-center"
                >
                  My Trips
                </Button>
              </a>
              {user ? (
                <Button
                  onClick={handleLogout}
                  className="w-full flex gap-2 items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <LuLogOut /> Logout
                </Button>
              ) : (
                <Button onClick={() => setOpenDialog(true)} className="w-full">
                  Sign In
                </Button>
              )}
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
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
                    className="h-[40px] w-[40px] rounded-full cursor-pointer"
                    alt="User"
                  />
                </PopoverTrigger>
                <PopoverContent className="w-40">
                  <div
                    onClick={handleLogout}
                    className="flex cursor-pointer justify-center gap-2 items-center p-2 hover:bg-gray-100 rounded-md"
                  >
                    <LuLogOut className="h-4 w-4" /> Logout
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
          )}
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogDescription>
              <div className="flex justify-between items-center mb-4">
                <img src="/guidemeai.png" alt="Logo" className="head-logo" />
                <Button
                  className="h-10 w-10"
                  onClick={() => setOpenDialog(false)}
                >
                  X
                </Button>
              </div>
              <h2 className="font-bold text-lg mt-2">Sign In With Google</h2>
              <p className="text-sm text-gray-500">
                Sign in with Google authentication securely
              </p>
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
