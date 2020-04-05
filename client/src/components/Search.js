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

    let matchedResults = Object.values(tweetHomeFeedState.homeFeedTweets.tweetsById).filter(user => {
        if (type.length >= 3 && user.status.toLowerCase().includes(type.toLowerCase())) {
            return (user)
        }
    })
    //reseting on empty
    useEffect(() => {
        if (type === '') {
            setSearchedUsers(null)
        }
    }, [type])

    const handleSearch = (props) => {
        history.push(`/tweet/${props}`)
        setType('')
    }


    return (
        <React.Fragment>
            <StyledSearchContainer>
                <form>
                    <label htmlFor="search"></label>
                    <div>Search For A User</div>
                    <StyledInput
                        onChange={e => setType(e.target.value)}
                        placeholder=" Search"
                        id="search"
                        type="text"
                        maxLength={30}
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

const StyledInput = styled.input``
const StyledSearchContainer = styled.div``

const Phrase = styled.div`
display: flex;
flex-wrap: wrap;
`

const EachList = styled.li`
&:hover {
    background-color: ${COLORS.buttons};
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
width: 20vw;



`

const StyledStrong = styled.strong`
background-color: transparent;
`