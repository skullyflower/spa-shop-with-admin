import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SiteContext = createContext({});

export default function AppContextProvider({ children }) {
  const [cartData, setCartData] = useState();
  return (
    <SiteContext.Provider
      value={{
        cartData: cartData,
        setCartData: setCartData,
      }}>
      {children}
    </SiteContext.Provider>
  );
}
AppContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
