import styled from "styled-components";

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
`;

export const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #eee;

  &:hover {
    background: #f0f0f0;
  }
`;
