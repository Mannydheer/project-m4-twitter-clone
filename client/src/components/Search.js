import React, { useState } from 'react'
import styled from 'styled-components';
import { TweetHomeContext } from './TweetHomeContext';
import { useHistory } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';


const Search = () => {
    let history = useHistory();
    //have access to the newly update state of all users here. 
    const [type, setType] = useState('');
    const { tweetHomeFeedState } = React.useContext(TweetHomeContext);
    //will always update with new matched results as setType rerenders the Search componenets.
    let matchedResults = Object.values(tweetHomeFeedState.homeFeedTweets.tweetsById).filter(user => {
        if (type.length >= 3 && user.status.toLowerCase().includes(type.toLowerCase())) {
            return (user)
        }
    })
    const handleSearch = (props) => {
        history.push(`/tweet/${props}`)
        setType('')
    }
    return (
        <React.Fragment>
            <StyledSearchContainer>
                <form>
                    <label htmlFor="search"></label>
                    <StyledInput
                        onChange={e => setType(e.target.value)}
                        placeholder="Search Meows"
                        id="search"
                        type="text"
                        maxLength={30}
                        value={type}
                        required
                    ></StyledInput>
                    <StyledFiSearch />

                </form>
                <div>
                    {matchedResults.map(result => {
                        let getIndex = result.status.toLowerCase().indexOf(type.toLowerCase())
                        let splitWords = result.status.split('')
                        let lengthWord = type.split('').length
                        let firstHalf = splitWords.slice(0, getIndex);
                        let wordPart = splitWords.slice(getIndex, getIndex + lengthWord)
                        let secondHalf = splitWords.slice(getIndex + lengthWord, splitWords.length)
                        return (
                            <Wrapper>
                                <StyledUl>
                                    <EachList onClick={() => handleSearch(result.id)}>
                                        {firstHalf}
                                        <StyledStrong>{wordPart}</StyledStrong>
                                        {secondHalf}
                                    </EachList>
                                </StyledUl>
                            </Wrapper>
                        )
                    })}
                </div>
            </StyledSearchContainer>
        </React.Fragment>
    )
}

export default Search;

const StyledInput = styled.input`
border: black 1px solid;
color: black;
border-radius: 10px;
padding: 5px;
font-size: 1.1rem;
outline: none;
width: 13vw;
@media screen and (max-width: 768px) {
    width: 50vw;
}
`
const StyledSearchContainer = styled.div`
@media screen and (max-width: 768px) {
display: flex;
justify-content: center;
}
`

const EachList = styled.li`
&:hover {
    opacity: 0.7;
}
`

const StyledUl = styled.ul`
color: black;

li {
    color: black;

    cursor: pointer;
list-style: none;
}
`

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
width: 15vw;
background-color: white;
box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
@media screen and (max-width: 768px) {
    width: 50vw;
}
`

const StyledStrong = styled.strong`
background-color: transparent;
`

const StyledFiSearch = styled(FiSearch)`
font-size: 1.1rem;
` 