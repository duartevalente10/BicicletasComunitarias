import { createContext } from "react";

// credentials context
export const CredentialContext = createContext({storedCredentials: {}, setStoredCredentials: () => {}})