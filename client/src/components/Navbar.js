import React from 'react';
import { home } from 'react-icons-kit/icomoon/home';
import { user } from 'react-icons-kit/fa/user';
import { bell } from 'react-icons-kit/iconic/bell'
import { bookmark } from 'react-icons-kit/fa/bookmark'
import FormDialog from './FormDialog';
import Icon from 'react-icons-kit';
import styled from 'styled-components';
import { COLORS } from '/Users/maniderdheer/Documents/GitHub/project-m4-twitter-clone/client/src/constants.js'
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from './CurrentUserContext';
import { ReactComponent as Logo } from '../assets/logo.svg'








const NavBar = () => {
  const { state } = React.useContext(CurrentUserContext)

  return (
    <StyledNav>
      <Logo></Logo>
      <Nav><NavigationLink to='/'>
        <Icon style={{ backgroundColor: 'transparent', paddingRight: '15px' }} icon={home}></Icon>
        <NavText>Home</NavText></NavigationLink>
      </Nav>
      <Nav><NavigationLink to={`/user/${state.currentUser.handle}`}>
        <Icon style={{ backgroundColor: 'transparent', paddingRight: '15px' }} icon={user}></Icon>
        <NavText>Profile</NavText></NavigationLink>
      </Nav>
      <Nav><NavigationLink to='/notifications'>
        <Icon style={{ backgroundColor: 'transparent', paddingRight: '15px' }} icon={bell}></Icon>
        <NavText>Notifications</NavText></NavigationLink>
      </Nav>
      <Nav><NavigationLink to='/bookmarks'>
        <Icon style={{ backgroundColor: 'transparent', paddingRight: '15px' }} icon={bookmark}></Icon>
        <NavText>Bookmarks</NavText></NavigationLink>
      </Nav>
      <Nav>
        <FormDialog></FormDialog>
      </Nav>
    </StyledNav>


  )

}

export default NavBar;


const StyledNav = styled.nav`
padding: 50px;
display:flex;
flex-direction: column;
position: fixed;
left: 15px;
@media screen and (max-width: 768px) {
display: none;
padding: 0;
}


`

const NavigationLink = styled(NavLink)`
padding: 20px;
color: black;
/* &.active {
    color: ${COLORS.primary};

  } */
text-decoration: none;
display: flex;
border-radius: 25px;

&:hover {
  background-color: rgb(53,161,241);
    transition: 0.5s all;

}
`;

const NavText = styled.div`
font-size: 1.4rem;
background-color: transparent;
  font-size: 1.1rem;
`
const Nav = styled.div`
padding: 10px;
`

