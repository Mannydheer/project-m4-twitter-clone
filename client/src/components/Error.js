import React from 'react';
import styled from 'styled-components';

const Error = () => {


    return (
        <Wrapper>

            <div>
                💣
            </div>
            <div>
                An unknown error has occured.
        </div>
            <div>
                Please try refreshing the page, reloading the home page, or contact support if the problem persists.
        </div>
        </Wrapper>

    )

}

export default Error;

const Wrapper = styled.div`
text-align: center;
font-size: 2rem;
font-weight: bold;
margin-top: 2rem;

`