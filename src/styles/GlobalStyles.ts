import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    /* Box sizing rules & remove default margin/padding */
    *,
    *::after,
    *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    }

    /* Defines what 1rem is & set core root defaults */
    html {
    font-size: 62.5%;

    &:focus-within {
        scroll-behavior: smooth;
    }
    }

    /* Set box-sizing & background color */
    body {
    box-sizing: border-box;

    background-color: #2f4f4f4f;
    background-color: #222222; /* Deep charcoal for a modern feel */



    }

    /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
    ul[role="list"],
    ol[role="list"] {
    list-style: none;
    }

    /* Make images easier to work with */
    img,
    picture,
    svg {
    max-width: 100%;
    display: block;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
    -webkit-text-wrap: balance;
    text-wrap: balance;
    }

    p {
    max-width: 70ch;
    -webkit-text-wrap: pretty;
    text-wrap: pretty;
    }

    a {
    text-decoration: none;

    &:not([class]) {
        text-decoration-skip-ink: auto;
    }
    }

    @media (prefers-reduced-motion: no-preference) {
    :has(:target) {
        -webkit-scroll-behaviour: smooth;
        scroll-behaviour: smooth;
        scroll-padding-top: 3rem;
    }
    }

    /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
    @media (prefers-reduced-motion: reduce) {
    html:focus-within {
        scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    }  
`;

export default GlobalStyles;
