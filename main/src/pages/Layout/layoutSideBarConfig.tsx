import { supabase } from "../../auth/superbaseClient";

export const buttonSignInList = (navigate: (path: string) => void) => [
  {
    icon: "pi pi-address-book",
    label: "Subscription",
    onClick: () => alert("haha idiot ~~ I am not gonna tell you XDDDD"),
  },
  {
    icon: "pi pi-sign-out",
    label: "Logout",
    onClick: async () => {
      await supabase.auth.signOut().then(() => {
        navigate("/login");
      });
    },
  },
  {
    icon: "pi pi-question-circle",
    label: "Help",
    onClick: () => alert("haha idiot ~~ who bird you XDDDD"),
  },
];

export const buttonLogInList = (navigate: (path: string) => void) => [
  {
    icon: "pi pi-sign-in",
    label: "Login",
    onClick: () => navigate("/login"),
  },
];
