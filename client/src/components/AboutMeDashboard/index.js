import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../../utils/queries';

const AboutMeDashboard = ({ myActivities, residency, favoritePlaces, futurePlaces }) => {
    const { profileId } = useParams();

    // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
    const { loading, data } = useQuery(
        profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
        {
            variables: { profileId: profileId },
        }
    );

    const profile = data?.me || data?.profile || {};

    return (
        <Grid >
            <React.Fragment>
                <CssBaseline />
                <Container>
                    <Box class="aboutMe">
                        <Typography class="aboutMe2">
                            <Link to="/aboutMe" style={{ color: '#212121' }}>About Me</Link>
                        </Typography>
                        {profile.residency?.length > 0 && (
                            <Typography>
                                <h4>Where I live:</h4>
                                <ul>{residency}</ul>
                            </Typography>)}
                        {profile.myActivities?.length > 0 && (
                            <Typography>
                                <h4>Activities I enjoy:</h4>
                                {myActivities &&
                                    myActivities.map((activity) => (
                                        <ul>{activity}</ul>
                                    ))}
                            </Typography>)}
                        {profile.favoritePlaces?.length > 0 && (
                            <Typography>
                                <h4>Favorite places I've visited:</h4>
                                {favoritePlaces &&
                                    favoritePlaces.map((place) => (
                                        <ul>{place}</ul>
                                    ))}
                            </Typography>)}
                        {profile.futurePlaces?.length > 0 && (
                            <Typography>
                                <h4>Places I want to go:</h4>
                                {futurePlaces &&
                                    futurePlaces.map((futurePlace) => (
                                        <ul>{futurePlace}</ul>
                                    ))}
                            </Typography>)}
                    </Box>
                </Container>
            </React.Fragment>
        </Grid>
    )
};

export default AboutMeDashboard;