import React, { useState } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Bookmarks from './components/Bookmarks';
import TweetDetails from './components/TweetDetails';
import HomeFeed from './components/HomeFeed';
import UserProfiles from './components/UserProfiles';
import Notifications from './components/Notifications';
import GlobalStyles from './components/GlobalStyles';
import styled from 'styled-components';
import Icon from 'react-icons-kit';

import { home } from 'react-icons-kit/icomoon/home';
import { user } from 'react-icons-kit/fa/user';
import { bell } from 'react-icons-kit/iconic/bell'
import { bookmark } from 'react-icons-kit/fa/bookmark'
import { CurrentUserContext } from './components/CurrentUserContext';
import { TweetHomeContext } from './components/TweetHomeContext';

import FollowHeader from './components/FollowHeader';
import Followers from './components/Followers';
import Following from './components/Following';

import FormDialog from './components/FormDialog';
import Search from './components/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from './components/Navbar';


function App() {

  const { state } = React.useContext(CurrentUserContext)
  const { tweetHomeFeedState } = React.useContext(TweetHomeContext);

  //hamburger
  const [burgerBool, setBurgerBool] = useState(false);


  return (

    <BrowserRouter>
      <GlobalStyles></GlobalStyles>
      {state.isLoaded && tweetHomeFeedState.isRetrieved ?
        <StyledBody>


          <StyledSide>
            <StyledNavi>
              <NavBar></NavBar>
            </StyledNavi>

            <BurgerMenu onClick={() => setBurgerBool(!burgerBool)}>
              <i style={{ fontSize: '50px' }} className="fa fa-bars"></i>
            </BurgerMenu>
            <BurgerNav>
              {burgerBool && <NavUl>
                <li><Link to='/'>        <Icon size={30} style={{ backgroundColor: 'transparent' }} icon={home}></Icon>
                </Link></li>
                <li><Link to={`/user/${state.currentUser.handle}`}><Icon size={30} style={{ backgroundColor: 'transparent' }} icon={user}></Icon>
                </Link></li>
                <li><Link to='/notifications'><Icon size={30} style={{ backgroundColor: 'transparent' }} icon={bell}></Icon></Link></li>
                <li><Link to='/bookmarks'> <Icon size={30} style={{ backgroundColor: 'transparent' }} icon={bookmark}></Icon></Link></li>
              </NavUl>}
              <div><FormDialog></FormDialog></div>
            </BurgerNav>
            {/* MAIN */}
            <StyledFlexSearch>
              {state.isLoaded && tweetHomeFeedState.isRetrieved && <Search></Search>}
            </StyledFlexSearch>
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
                  <FollowWrapper>
                    <FollowHeader></FollowHeader>
                    <Followers></Followers>
                  </FollowWrapper>
                </Route>
                <Route exact path='/:user/following'>
                  <FollowWrapper>
                    <FollowHeader></FollowHeader>
                    <Following></Following>
                  </FollowWrapper>
                </Route>
              </Switch>
            </Main>


          </StyledSide>
        </StyledBody>
        : <StyledCircle><CircularProgress></CircularProgress></StyledCircle>
      }
    </BrowserRouter >


  );
}

export default App;

const FollowWrapper = styled.div`
`
const StyledNavi = styled.div`
`
const NavUl = styled.ul`
display: flex;
justify-content: space-evenly;
li{
list-style: none;
padding: 10px;
}
@media screen and (max-width: 768px) {

}


`

const Main = styled.main`
width: 80%;
margin: 0 auto;

`

const StyledSide = styled.div`
`
const StyledCircle = styled.div`
display: flex;
justify-content: center;
`
const StyledFlexSearch = styled.div`
position: absolute;
right: 60px;
top: 10px;

@media screen and (max-width: 768px) {
position: static;
display: flex;
justify-content: center;
padding: 2rem;
}
`

const StyledBody = styled.div`
display: flex;
width: 80%;
margin: 0 auto;
`

const BurgerMenu = styled.div`

text-align: center;
display: none;
@media screen and (max-width: 768px) {
display: block;
}
`

const BurgerNav = styled.div`
color: black;
text-align: center;
display: none;

a {
  color: black;
}
@media screen and (max-width: 768px) {
display: block;
`


