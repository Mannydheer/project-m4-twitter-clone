import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';


const UserProfiles = ({ storeFollowers }) => {

    let location = useLocation().pathname.split('/')
    let path = location[2];
    const [selectedUser, setSelectedUser] = useState(null);
    const [userBool, setuserBool] = useState(false);






    //on mount
    //add ERROR HANDLING
    useEffect(() => {
        // handles the user profile informations.
        const handleClickedProfile = async () => {
            // console.log('GIT TRIGGERED')
            const getUserProfile = await fetch(`/api/${path}/profile`);
            const returnedProfile = await getUserProfile.json();
            setSelectedUser(returnedProfile.profile)
            setuserBool(true)
        }

        //function call.

        //if its null, then followers was not clicked.Not undefined if I dont click on followers
        handleClickedProfile()

    }, [])







    return (
        <React.Fragment>
            {userBool &&
                <div><div>Banner <img src={selectedUser.bannerSrc}></img></div>

                    <div>Name: {selectedUser.displayName}</div>
                    <div>Profile Image<img src={selectedUser.avatarSrc}></img></div>
                    <div>Location: {selectedUser.location}</div>
                    <div>Bio: {selectedUser.bio}</div>
                    <Link to={`/${path}/followers`}>Followers: {selectedUser.numFollowers}</Link>
                    <Link to={`/${path}/following`}>Following: {selectedUser.numFollowing}</Link>






                </div>}
        </React.Fragment >
    )


}

export default UserProfiles