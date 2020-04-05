import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { TweetHomeContext } from './TweetHomeContext';
import { Link, useHistory } from 'react-router-dom';



const Search = () => {
    let history = useHistory();


    //have access to the newly update state of all users here. 
    const [type, setType] = useState('');
    const [searchedUsers, setSearchedUsers] = useState(null)
    const { tweetHomeFeedState } = React.useContext(TweetHomeContext);
    console.log(tweetHomeFeedState)



    //will update the valye of searchedUsers with currently typed letters.
    useEffect(() => {

        if (tweetHomeFeedState.isRetrieved === true) {

            let userNames = Object.values(tweetHomeFeedState.homeFeedTweets.tweetsById)
            userNames.forEach(user => {
                let splitUser = user.author.displayName.toLowerCase().split('')
                splitUser.forEach((letter, index) => {
                    if (letter === type && index < 4) {
                        // statusHolder.push(user.status)
                        setSearchedUsers({
                            ...searchedUsers,
                            users: user.author.displayName,
                            current: user.author.handle

                        })

                    }
                });
            });
        }

    }, [type])

    //listen for a keypress

    const handleClickReset = () => {
        setSearchedUsers(null)
        history.push(`/user/${searchedUsers.current}`)
    }

    //reseting on empty
    useEffect(() => {
        if (type === '') {
            setSearchedUsers(null)
        }
    }, [type])




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
                {searchedUsers !== null &&
                    <div>
                        <button onClick={handleClickReset}>
                            {searchedUsers.users}

                        </button>

                    </div>
                }
            </StyledSearchContainer>
        </React.Fragment>

    )

}
//           // Object.values(searchedUsers).foreach(phrase => {
//     return <Phrase>
//         <button>
//             {phrase}
//         </button>
//     </Phrase>
// })}
{/* {searchedUsers !== null &&
                    <button>{searchedUsers.users}</button>

                } */}
export default Search;

const StyledInput = styled.input``
const StyledSearchContainer = styled.div``

const Phrase = styled.div`
display: flex;
flex-wrap: wrap;
`