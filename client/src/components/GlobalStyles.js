import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
    font-size: 15px;
    font-family: 'Source Sans Pro', sans-serif;
    color: black;
    background-color: white;


   


}
*{
    margin: 0;
    padding: 0;
}



textarea {
    resize: none;
}

`;

export default GlobalStyles;