// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/src/lib/supabase/client";
// import { Button } from "../ui/button";

// const LoginLogoutButton = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks authentication state
//   const router = useRouter();

//   // Fetch the current session and update the state
//   const fetchAuthStatus = async () => {
//     try {
//       const { data: { session } } = await supabase.auth.getSession();
//       console.log("Session fetched dynamically:", session);

//       // Debugging localStorage to verify tokens
//       const localStorageData = localStorage.getItem("supabase.auth.token");
//       console.log("LocalStorage Supabase Token:", localStorageData);

//       setIsLoggedIn(!!session?.user); // Update state based on session presence
//     } catch (error) {
//       console.error("Error fetching session:", error);
//     }
//   };

//   useEffect(() => {
//     // Fetch session status on component mount
//     fetchAuthStatus();
  
//     // Listen for authentication state changes
//     const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
//       console.log("Auth state changed:", _event, session);
//       setIsLoggedIn(!!session?.user);
//     });
  
//     // Debugging subscription object
//     console.log("Subscription object:", subscription);
  
//     // Cleanup subscription
//     return () => {
//       if (subscription && typeof subscription.unsubscribe === "function") {
//         subscription.unsubscribe();
//       } else {
//         console.warn("Subscription does not have an unsubscribe method:", subscription);
//       }
//     };
//   }, []);
  
  
//   useEffect(() => {
//     console.log("Auth state updated. IsLoggedIn:", isLoggedIn);
//   }, [isLoggedIn]);

//   // Handle logout
//   const handleSignout = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       setIsLoggedIn(false); // Reset state after logout
//       router.push("/login"); // Redirect to login page
//     } catch (error) {
//       console.error("Error during signout:", error);
//     }
//   };

//   return (
//     <Button
//       variant="outline"
//       onClick={isLoggedIn ? handleSignout : () => router.push("/login")}
//     >
//       {isLoggedIn ? "Logout" : "Login"}
//     </Button>
//   );
// };

// export default LoginLogoutButton;
