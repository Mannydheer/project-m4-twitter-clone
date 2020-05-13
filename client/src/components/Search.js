import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { TweetHomeContext } from './TweetHomeContext';
import { Link, useHistory } from 'react-router-dom';
import { COLORS } from '../constants'




const Search = () => {
    let history = useHistory();


    //have access to the newly update state of all users here. 
    const [type, setType] = useState('');
    const [searchedUsers, setSearchedUsers] = useState('')
    const { tweetHomeFeedState } = React.useContext(TweetHomeContext);

    //will always update with new matched results as setType rerenders the Search componenets.
    let matchedResults = Object.values(tweetHomeFeedState.homeFeedTweets.tweetsById).filter(user => {
        if (type.length >= 3 && user.status.toLowerCase().includes(type.toLowerCase())) {
            return (user)
        }
    })

    console.log(matchedResults)

    const handleSearch = (props) => {
        history.push(`/tweet/${props}`)
        setType('')
    }
    return (
        <React.Fragment>
            <StyledSearchContainer>
                <form>
                    <label htmlFor="search"></label>
                    <i className="fa fa-search"></i>
                    <StyledInput
                        onChange={e => setType(e.target.value)}
                        placeholder="Search Meows"
                        id="search"
                        type="text"
                        maxLength={30}
                        value={type}
                        required
                    ></StyledInput>
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
border-radius: 10px;
padding: 2px;
outline: none;
width: 13vw;




`
const StyledSearchContainer = styled.div`
@media screen and (max-width: 768px) {
display: flex;
justify-content: center;

}
`

const Phrase = styled.div`

`

const EachList = styled.li`
&:hover {
    opacity: 0.7;
}
`

const StyledUl = styled.ul`
li {
    cursor: pointer;
list-style: none;

}
`

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
width: 15vw;
box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);


`

const StyledStrong = styled.strong`
background-color: transparent;
`