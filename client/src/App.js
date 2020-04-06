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
import { ReactComponent as Logo } from './assets/logo.svg'

import { home } from 'react-icons-kit/icomoon/home';
import { user } from 'react-icons-kit/fa/user';
import { bell } from 'react-icons-kit/iconic/bell'
import { bookmark } from 'react-icons-kit/fa/bookmark'
import { CurrentUserContext } from './components/CurrentUserContext';
import { TweetHomeContext } from './components/TweetHomeContext';

import FollowHeader from './components/FollowHeader';
import Followers from './components/Followers';
import Following from './components/Following';
import { COLORS } from './constants';
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
              <i style={{ fontSize: '50px' }} class="fa fa-bars"></i>
            </BurgerMenu>
            <BurgerNav>
              {burgerBool && <NavUl>
                <li><Link to='/'>        <Icon style={{ backgroundColor: 'transparent' }} icon={home}></Icon>
                </Link></li>
                <li><Link to={`/user/${state.currentUser.handle}`}><Icon style={{ backgroundColor: 'transparent' }} icon={user}></Icon>
                </Link></li>
                <li><Link to='/notifications'><Icon style={{ backgroundColor: 'transparent' }} icon={bell}></Icon></Link></li>
                <li><Link to='/bookmarks'> <Icon style={{ backgroundColor: 'transparent' }} icon={bookmark}></Icon></Link></li>
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



        </StyledBody>
        : <StyledCircle><CircularProgress></CircularProgress></StyledCircle>
      }
    </BrowserRouter >


  );
}

export default App;


// const StyledNav = styled.nav`


// @media only screen and (min-width: 400px) {

// padding: 50px;
// display:flex;
// flex-direction: column;
// position: fixed;
// left: 50px;
// }


// @media only screen and (max-width: 375px) {
//   display: none;
// }


// `
const StyledNavi = styled.div`
`
const NavUl = styled.ul`

@media only screen and (max-width: 450px) {
display: flex;
justify-content: space-evenly;
li{
list-style: none;
padding: 10px;
}
}
`

const Main = styled.main`

@media only screen and (min-width: 475px) {
  position: relative;
left: 350px;
}

@media only screen and (max-width: 450px) {
width: 100vw;
text-align: center;
}
`

const StyledSide = styled.div`
`
const StyledCircle = styled.div`
display: flex;
justify-content: center;
`
const StyledFlexSearch = styled.div`

@media only screen and (min-width: 475px) {
  position: absolute;
right: 150px;
top: 10px;
}

@media only screen and (max-width: 450px) {
   display: flex;
   justify-content: center;
   font-weight: bold;
   width: 100vw;
}

`

const StyledBody = styled.div`
@media only screen and (min-width: 475px) {
display: flex;
}

@media only screen and (max-width: 450px) {
}



`

const BurgerMenu = styled.div`
text-align: center;
@media only screen and (min-width: 450px) {

display: none;
}

`

const BurgerNav = styled.div`
text-align: center;
@media only screen and (min-width: 450px) {

display: none;
}
`



//pseudocode for post modal.
//Input
//modal

//on click, triggers the modal, which triggers apost. 




