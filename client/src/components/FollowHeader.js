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

a{
    text-decoration: none;
    
}
border: solid 1px gray;
width: 56vw;



`

const NavigationLink = styled(NavLink)`
width: 28vw;
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



`
