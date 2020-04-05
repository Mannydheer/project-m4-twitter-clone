import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import './App.css';
import Bookmarks from './components/Bookmarks';
import TweetDetails from './components/TweetDetails';
import HomeFeed from './components/HomeFeed';
import UserProfiles from './components/UserProfiles';
import Notifications from './components/Notifications';
import GlobalStyles from './components/GlobalStyles';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { ReactComponent as Logo } from './assets/logo.svg'
import { home } from 'react-icons-kit/icomoon/home';
import { user } from 'react-icons-kit/fa/user';
import { bell } from 'react-icons-kit/iconic/bell'
import { bookmark } from 'react-icons-kit/fa/bookmark'
import { CurrentUserContext } from './components/CurrentUserContext';
import FollowHeader from './components/FollowHeader';
import Followers from './components/Followers';
import Following from './components/Following';
import { COLORS } from './constants';
import FormDialog from './components/FormDialog';
import Search from './components/Search';
import CircularProgress from '@material-ui/core/CircularProgress';




function App() {

  const { state } = React.useContext(CurrentUserContext)

  return (

    <BrowserRouter>
      <GlobalStyles></GlobalStyles>
      {state.isLoaded ?
        <StyledBody>


          <StyledSide>
            {/* NAV BAR */}
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
            {/* MAIN */}
            <Main>

              <Switch>
                <Route exact path="/">
                  <HomeFeed></HomeFeed>
                </Route>
                <Route exact path='/notifications'>
                  <Notifications></Notifications>
                </Route>
                <Route exact path='/bookmarks'>
                  <Bookmarks></Bookmarks>
                </Route>
                {/* double check :tweetId and :profileId for colons.  */}
                <Route path='/tweet/:tweetId'>
                  <TweetDetails></TweetDetails>
                </Route>
                <Route exact path='/user/:selectedUser'>
                  <UserProfiles></UserProfiles>
                </Route>

                <Route exact path='/:user/followers'>
                  <FollowHeader></FollowHeader>
                  <Followers></Followers>
                </Route>
                <Route exact path='/:user/following'>
                  <FollowHeader></FollowHeader>
                  <Following></Following>
                </Route>

              </Switch>
            </Main>


          </StyledSide>
          <StyledFlexSearch>
            <Search></Search>
          </StyledFlexSearch>


        </StyledBody>
        : <StyledCircle><CircularProgress></CircularProgress></StyledCircle>
      }
    </BrowserRouter >


  );
}

export default App;


const StyledNav = styled.nav`
padding: 50px;
display:flex;
flex-direction: column;
position: fixed;
left: 50px;
`

const Main = styled.main`
position: relative;
left: 350px;
background-color: rgb(21,32,43);


`

const StyledSide = styled.div`
display: flex;
`
const StyledCircle = styled.div`
display: flex;
justify-content: center;
`
const StyledFlexSearch = styled.div`
position: absolute;
right: 10px;
top: 10px;

`

const StyledBody = styled.div`
/* display: flex;
justify-content: center; */
background-color: rgb(21,32,43);



`

const NavigationLink = styled(NavLink)`
padding: 20px;
color: white;





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
`

const Nav = styled.div`
padding: 10px;
`


//pseudocode for post modal.
//Input
//modal

//on click, triggers the modal, which triggers apost. 




