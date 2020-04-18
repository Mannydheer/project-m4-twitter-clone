import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
    font-size: 15px;
    font-family: 'Poppins', sans-serif;
        color: black;


@media only screen and (max-width: 450px) {
background-color: rgb(21,32,43);
color: white;
}

body {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}
    


   


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