import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import './App.css';
import Bookmarks from './components/Bookmarks';
import TweetDetails from './components/TweetDetails';
import HomeFeed from './components/HomeFeed';
import Profile from './components/Profile';
import UserProfiles from './components/UserProfiles';
import Notifications from './components/Notifications';
import GlobalStyles from './components/GlobalStyles';
import styled from 'styled-components';
// import { COlORS } from './constants';
import Icon from 'react-icons-kit';
import CatLogo from '../src/assets/logo.svg'
import { home } from 'react-icons-kit/icomoon/home';
import { user } from 'react-icons-kit/fa/user';
import { bell } from 'react-icons-kit/iconic/bell'
import { bookmark } from 'react-icons-kit/fa/bookmark'
import { CurrentUserContext } from './components/CurrentUserContext';
import Followers from './components/Followers';
import Following from './components/Following';

function App() {

  const { state } = React.useContext(CurrentUserContext)

  return (

    <BrowserRouter>
      <GlobalStyles></GlobalStyles>

      {state.isLoaded ?
        <StyledSide>

          <StyledNav>
            <img src={CatLogo} alt='Cat Logo'></img>
            {/* <NavigationLink> */}
            <NavigationLink to='/'><Icon icon={home}></Icon>Home</NavigationLink>
            <NavigationLink to='/profileId'><Icon icon={user}></Icon>Profile</NavigationLink>
            <NavigationLink to='/notifications'><Icon icon={bell}></Icon>Notifications</NavigationLink>
            <NavigationLink to='/bookmarks'><Icon icon={bookmark}></Icon>Bookmarks</NavigationLink>

            {/* </NavigationLink> */}
          </StyledNav>
          {/* Keep in place Switch will place in order.  */}
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
              <Route exact path='/:profileId'>
                {state.isLoaded && <Profile></Profile>}
              </Route>
              <Route exact path='/user/:selectedUser'>
                <UserProfiles></UserProfiles>
              </Route>
              <Route exact path='/:user/followers'>
                <Followers></Followers>
              </Route>
              <Route exact path='/:user/following'>
                <Following></Following>
              </Route>

            </Switch>
          </Main>
        </StyledSide>
        : <div>LOADING</div>}


    </BrowserRouter>

  );
}

export default App;


const StyledNav = styled.nav`
padding: 50px;
display:flex;
flex-direction: column;
`

const Main = styled.main`
width: 60%;

`

const StyledSide = styled.div`
display: flex;

`

const NavigationLink = styled(NavLink)`
padding: 20px;
/* 80% of div */
width: 60%;
color: white;
text-decoration: none;
display: flex;
background-color: rgb(21,32,43);
border-radius: 25px;
font-size: 20px;


&:hover {
  background-color: purple;
  transition: 0.5s all;
}


`;
