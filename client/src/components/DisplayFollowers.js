import React, { useState } from 'react';
import HandleFollow from './HandleFollow';


const DisplayFollowers = ({ eachUser }) => {


    const [followUnfollow, setFollowUnfollow] = useState(false)




    const handleFollowerPut = () => {
        setFollowUnfollow(true)
    }


    return (

        <React.Fragment>

            <div>Profile Image<img src={eachUser.avatarSrc}></img></div>
            <div> Name: {eachUser.displayName}</div>
            <div>Name: {eachUser.handle}</div>
            <div>@{eachUser.handle}</div>
            <div>Bio: {eachUser.bio}</div>
            {/* add logic follow button */}
            <button onClick={handleFollowerPut}>
                Follow/unfollow
        </button>
            {/* //if true it will trigger HandleFollow which will do the fetch*/}
            {followUnfollow && <div>
                <HandleFollow setFollowUnfollow={setFollowUnfollow} handle={eachUser.handle}></HandleFollow>
            </div>}
        </React.Fragment>

    )

}


export default DisplayFollowers;