import React from "react";
import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const NavButton = ({ path, activepath, children }) => {
  return (
    <Button
      size={"xs"}
      border={0}
      as={Link}
      to={path}
      className={activepath === path ? "active" : undefined}>
      {children}
    </Button>
  );
};
const NavBar = ({ activepath }) => {
  return (
    <HStack
      className="navbar"
      justifyContent={"center"}
      gap={2}
      wrap={"wrap"}>
      <NavButton
        path="/home"
        activepath={activepath}>
        Home
      </NavButton>
      <NavButton
        size={"sm"}
        activepath={activepath}
        path="/blog">
        Blog
      </NavButton>
      <NavButton
        size={"sm"}
        activepath={activepath}
        path="/content">
        Content Pages
      </NavButton>
      <NavButton
        size={"sm"}
        activepath={activepath}
        path="/gallery">
        Galleries
      </NavButton>
      <NavButton
        size={"sm"}
        activepath={activepath}
        path="/images">
        Image Upload
      </NavButton>
      <NavButton
        size={"sm"}
        activepath={activepath}
        path="/products">
        Products
      </NavButton>
      <NavButton
        size={"sm"}
        activepath={activepath}
        path="/categories">
        Categories
      </NavButton>
      {/* <NavButton
        size={"sm"}
        activepath={activepath}
        path="/subjects">
        Subjects
      </NavButton> */}
      <NavButton
        size={"sm"}
        activepath={activepath}
        path="/sale">
        Sale
      </NavButton>
      <NavButton
        size={"sm"}
        activepath={activepath}
        path="/config">
        Config
      </NavButton>
    </HStack>
  );
};

export default NavBar;
