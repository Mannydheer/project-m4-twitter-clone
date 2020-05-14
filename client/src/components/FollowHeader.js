import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../constants';



const FollowHeader = () => {

    let path = useParams().user;

    return (
        <Header>
            <Path>@{path}</Path>
            <FollowNav>
                <NavigationLink to={`/${path}/followers`}>Follower</NavigationLink>
                <NavigationLink to={`/${path}/following`}>Following</NavigationLink>
            </FollowNav>
        </Header>
    )
}

export default FollowHeader;


const Path = styled.div`
text-align: center;
font-size: 2rem;
font-weight: bold;
`
const Header = styled.div`
z-index: 1002;
margin-top: 2rem;
width: 80%;
margin: 0 auto;
a{
text-decoration: none;
width: 50%;
border: solid 1px gray;
color: white;
}
@media screen and (max-width: 768px) {
width: 100%;
margin: 0;
}
`
const NavigationLink = styled(NavLink)`
text-align: center;
padding: 10px;

&.active {
    color: ${COLORS.buttons};
    text-decoration: underline;
  }
&:hover {
    border: solid gray 0.5px;
    color: ${COLORS.buttons};
}
`
const FollowNav = styled.div`
display: flex;
padding-top: 30px;
width: 100%;

`
