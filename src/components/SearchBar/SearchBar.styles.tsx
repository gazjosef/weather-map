import styled from "styled-components";

export const SearchContainer = styled.div`
  border: 1px solid rgba(220, 220, 220, 0.5);
  border-radius: 0.5rem;

  position: relative;
  display: flex;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  font-size: 1.6rem;
`;

export const SearchButton = styled.button`
  cursor: pointer;
  background: #3498db;
  padding: 10px 15px;
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: white;

  &:hover {
    background: #2980b9;
  }
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin-top: 5px;
  z-index: 10;
  color: black;
`;

export const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;
