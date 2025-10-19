import styled from "styled-components";

export const SidebarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isCollapsed"].includes(prop), // Filter `fullWidth` prop
})<{ isCollapsed: boolean }>`
  width: ${(props) => (props.isCollapsed ? "0px" : "500px")};
  background: #2c3e50;
  padding: ${(props) => (props.isCollapsed ? "0" : "20px")};

  color: white;

  transition: width 0.3s ease-in-out;
  overflow: hidden;
  z-index: 1000;
  position: relative;
`;
