import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import BadgeDashboard from '../components/BadgeDashboard';
import CommentDashboard from '../components/CommentDashboard';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
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
            <h2 className="card-header">
                {profileId ? `${profile.name}'s` : 'Your'} Dashboard
            </h2>
            <Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <BadgeDashboard />
                    <CommentDashboard />
                </Grid>
            </Box>
            {/* {profile.skills?.length > 0 && (
                <BadgeDashboard
                    skills={profile.skills}
                    isLoggedInUser={!profileId && true}
                />
            )} */}


            {/* <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
                <SkillForm profileId={profile._id} />
            </div> */}
        </div >
    );
};

export default Profile;