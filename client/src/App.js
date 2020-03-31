import React from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import './App.css';
import Bookmarks from './components/Bookmarks';
import TweetDetails from './components/TweetDetails';
import HomeFeed from './components/HomeFeed';
import Profile from './components/Profile';
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



function App() {
  return (
    <BrowserRouter>
      <GlobalStyles></GlobalStyles>

      <nav>
        <img src={CatLogo} alt='Cat Logo'></img>
        {/* <NavigationLink> */}


        <div><NavLink to='/'><Icon icon={home}></Icon>Home</NavLink></div>
        <div><NavLink to='/profileId'><Icon icon={user}></Icon>Profile</NavLink></div>
        <div><NavLink to='/notifications'><Icon icon={bell}></Icon>Notifications</NavLink></div>
        <div><NavLink to='/bookmarks'><Icon icon={bookmark}></Icon>Bookmarks</NavLink></div>
        {/* </NavigationLink> */}

      </nav>
      {/* Keep in place Switch will place in order.  */}
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
        <Route exact path='/tweet/:tweetId'>
          <TweetDetails></TweetDetails>
        </Route>
        <Route exact path='/:profileId'>
          <Profile></Profile>
        </Route>
      </Switch>


    </BrowserRouter>

  );
}

export default App;

// const NavigationLink = styled(NavLink)`
//   /* default styles here */

//   &.active {
//     color: ${COLORS.primary};
//   }
// `;
