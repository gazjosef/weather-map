import styled from "styled-components";

export const CenteredGrid = styled.div.withConfig({
  shouldForwardProp: (prop) => !["fullScreen"].includes(prop), // Filter `fullWidth` prop
})<{
  fullScreen?: boolean;
  height?: string;
  width?: string;
}>`
  display: grid;
  place-items: center;
  height: ${({ fullScreen, height }) =>
    fullScreen ? "100vh" : height || "auto"};
  width: ${({ fullScreen, width }) => (fullScreen ? "100vw" : width || "auto")};
`;

export const Flex = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["fullWidth", "alignItems", "justifyContent"].includes(prop),
})<{
  justifyContent?: string;
  alignItems?: string;
  flexDirection?: string;
  gap?: string;
  fullWidth?: boolean;
  height?: string;
}>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  align-items: ${({ alignItems }) => alignItems || "stretch"};
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  gap: ${({ gap }) => gap || "0"};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  height: ${({ height }) => height || "auto"};
`;

export const FlexColumn = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["justifyContent", "alignItems", "fullWidth"].includes(prop), // Filter `fullWidth` prop
})<{
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  fullWidth?: boolean;
  height?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  align-items: ${({ alignItems }) => alignItems || "stretch"};
  gap: ${({ gap }) => gap || "0"};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  height: ${({ height }) => height || "auto"};
`;
