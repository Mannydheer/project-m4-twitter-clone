import React, { useState, useEffect } from 'react';

import { CurrentUserContext } from './CurrentUserContext';

const Profile = () => {

    const { state } = React.useContext(CurrentUserContext)
    console.log(state, 'INSIDE PROFILE')

    //can display all user info from state.

    return (<React.Fragment>

        <div>
            Name: {state.currentUser.displayName}
        </div>
    </React.Fragment>
    )


}

export default Profile;