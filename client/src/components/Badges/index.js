import React from 'react';
import BadgeData from './badge.json';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Comments from '../Comments';

import { REMOVE_ACTIVITY } from '../../utils/mutations';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../../utils/queries';

const useStyles = makeStyles({
    media: {
        backgroundColor: 'gray',
    },
    textField: {
        justifyContent: 'center',
        backgroundColor: 'white',
    }
});

const Badges = ({ activities, isLoggedInUser = false }) => {
        const classes = useStyles();
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

    return (
        <div>
            <Grid container spacing={2}>
                {/*       <div className="flex-row justify-space-between my-4">
                {activities &&
                    activities.map((activity) => (
                        <div key={activity} className="col-12 col-xl-6"> */}
                <Card sx={{ minWidth: 275, m: 3 }}>
                    <CardContent>
                        <CardMedia
                            style={{ height: '37vh' }}
                            /* image={badgeDisplay(activity)} */
                        />
                        <Typography variant="h5" component="div">
                            {/* {activity.title} */}Activities.Title
                        </Typography>
                        <Typography variant="body2">
                            You visited {/* {activity.description} */} Activities.description
                        </Typography>
                        {/* {profile.comments?.length > 0 && ( */}
                        <Comments
                            comments={profile.comments}
                            isLoggedInUser={!profileId && true}
                        />
                        {/*  )} */}
                    </CardContent>
                    <div>
                        <h5>Add Comment</h5>
                        <TextField className={classes.textField} id="outlined-basic" variant="outlined" />
                    </div>
                    <button
                        className="btn btn-sm btn-danger ml-auto"
                    /*  onClick={() => handleRemoveActivity(activity)} */
                    >
                        X
                    </button>
                </Card>
            </Grid>
        </div>
    );
};

export default Badges;