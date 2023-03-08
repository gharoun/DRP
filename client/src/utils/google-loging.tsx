import { useEffect, useRef } from "react";
import { useLogin } from "@pankod/refine-core";
import { CredentialResponse } from "../interfaces/google";
export const GoogleButton = (): JSX.Element => {
  const divRef = useRef<HTMLDivElement>(null);
  const { mutate: login } = useLogin<CredentialResponse>();
  useEffect(() => {
    if (typeof window === "undefined" || !window.google || !divRef.current) {
      return;
    }

    try {
      window.google.accounts.id.initialize({
        ux_mode: "popup",
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: async (res: CredentialResponse) => {
          if (res.credential) {
            login(res);
          }
        },
      });
      window.google.accounts.id.renderButton(divRef.current, {
        theme: "filled_blue",
        size: "large",
        type: "standard",
        shape: "pill",
      });
    } catch (error) {
      console.log(error);
    }
  }, [[process.env.REACT_APP_GOOGLE_CLIENT_ID, window.google, divRef.current]]); // you can also add your client id as dependency here

  return <div ref={divRef} />;
};
