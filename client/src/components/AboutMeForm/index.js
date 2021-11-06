import React from 'react';

import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import MyActivitiesForm from '../MyActivitiesForm';
import FavoritePlacesForm from '../FavoritePlacesForm';
import FuturePlacesForm from '../FuturePlacesForm';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const AboutMeForm = () => {
    const { profileId } = useParams();

    // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
    const { loading, data } = useQuery(
        profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
        {
            variables: { profileId: profileId },
        }
    );

    // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
    const profile = data?.me || data?.profile || {};

    // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
        return <Redirect to="/me" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile?.name) {
        return (
            <h4>
                You need to be logged in to see your profile page. Use the navigation
                links above to sign up or log in!
            </h4>
        );
    }
    return (
        <div>
            <MyActivitiesForm profileId={profile._id}/>
            <FavoritePlacesForm profileId={profile._id}/>
            <FuturePlacesForm profileId={profile._id}/>
        </div>
    );
};

export default AboutMeForm;
