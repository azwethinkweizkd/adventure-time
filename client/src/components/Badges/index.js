import React from 'react';
import BadgeData from './badge.json';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Comments from '../Comments';

const useStyles = makeStyles({
    media: {
        height: 100,
      },
});

import { REMOVE_ACTIVITY } from '../../utils/mutations';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../../utils/queries';

const Badges = ({ activities, isLoggedInUser = false }) => {
    const { profileId } = useParams();

    const { loading, data } = useQuery(
        profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
        {
            variables: { profileId: profileId },
        }
    );

    const profile = data?.me || data?.profile || {};

    const [removeActivity, { error }] = useMutation(REMOVE_ACTIVITY, {
        update(cache, { data: { removeActivity } }) {
            try {
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: removeActivity },
                });
            } catch (e) {
                console.error(e);
            }
        },
    });

    const handleRemoveActivity = async (activity) => {
        try {
            const { data } = await removeActivity({
                variables: { activity },
            });
        } catch (err) {
            console.error(err);
        }
    };

export default function Badges() {
    console.log(Badges);
    const classes = useStyles();
    return (
        <div>
      <>
    <Grid container spacing={2} justifyContent="center">
    {
    BadgeData.map((props) => {
    return (        
        <Card sx={{ minWidth: 275, m: 3 }}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    />
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.name}
                </Typography>
                <Typography variant="body2">
                    {props.award}
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>
    )})
    }</Grid>
        </>
            {/*       <div className="flex-row justify-space-between my-4">
                {activities &&
                    activities.map((activity) => (
                        <div key={activity} className="col-12 col-xl-6"> */}
            <Card sx={{ minWidth: 275, m: 3 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        benevolent
                    </Typography>
                    {/* {profile.comments?.length > 0 && ( */}
                        <Comments
                            comments={profile.comments}
                            isLoggedInUser={!profileId && true}
                        />
                   {/*  )} */}
                </CardContent>
                <button
                    className="btn btn-sm btn-danger ml-auto"
                /*  onClick={() => handleRemoveActivity(activity)} */
                >
                    X
                </button>
            </Card>
            {/* </div>
                    ))}
            </div>
            {error && (
                <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
            )} */}
        </div>
    );
};