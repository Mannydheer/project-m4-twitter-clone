import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DisplayFollowers from './DisplayFollowers';

const Followers = () => {

    // get url handle
    let location = useLocation().pathname.split('/')
    let path = location[1];
    //states for storing followers and render in return
    const [storeFollowers, setStoreFollowers] = useState(null)
    //on component mount
    useEffect(() => {
        const getFollowers = async () => {
            try {
                let response = await fetch(`/api/${path}/followers`)
                if (response.status !== 200) {
                    throw Error('Error Occured Followers')
                }
                else {
                    let followers = await response.json();
                    //store only followers. Since it is array(index 0) of OBJECT key: 0 and value=object. Pass the object
                    setStoreFollowers(followers.followers)
                }
            }
            catch (err) {
                throw Error(err)
            }
        }
        getFollowers();

    }, [path])

    return (
        <React.Fragment>
            {storeFollowers !== null &&
                storeFollowers.map(eachUser => {
                    return <DisplayFollowers
                        key={`${eachUser.joined}${eachUser.avatarSrc}`}
                        eachUser={eachUser} />
                }
                )}
        </React.Fragment>
    )
}

export default Followers;