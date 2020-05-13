import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../constants';



const FollowHeader = () => {

    let path = useParams().user;
    console.log(path)

    return (
        <Header>
            <div>@{path}</div>
            <FollowNav>
                <NavigationLink to={`/${path}/followers`}>Follower</NavigationLink>
                <NavigationLink to={`/${path}/following`}>Following</NavigationLink>
            </FollowNav>
        </Header>
    )
}

export default FollowHeader;

const Header = styled.div`

width: 50%;
margin: 0 auto;
a{
text-decoration: none;
width: 50%;
border: solid 1px gray;
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
