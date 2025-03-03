import styled from "styled-components";

export const CenteredGrid = styled.div<{
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

export const Flex = styled.div<{
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

export const FlexColumn = styled.div<{
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
