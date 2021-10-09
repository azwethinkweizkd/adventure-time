import React from 'react';
import badgeData from '../../utils/badges.json';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Comments from '../Comments';
import CommentForm from '../CommentForm';

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

    const handleRemoveActivity = async (activityId) => {
        try {
            const { data } = await removeActivity({
                variables: { activityId },
            });
        } catch (err) {
            console.error(err);
        }
    };

    const badgeDisplay = async (activity) => {
        console.log(badgeData)
        for (let i = 0; i < badgeData.length; i++) {
            const element = badgeData[i];
            if (activity.title === element.name) {
                return `${element.image}`
            }  
            
        }
    }

    return (
        <div>
            <Grid container spacing={2}>
                <div className="flex-row justify-space-between my-4">
                    {activities &&
                        activities.map((activityData) => (
                            <div key={activityData.title} className="col-12 col-xl-6">
                                <Card sx={{ minWidth: 275, m: 3, backgroundColor: '#b2dfdb' }} >
                                    {isLoggedInUser && (
                                        <IconButton aria-label="delete">
                                            <DeleteIcon
                                        onClick={() => handleRemoveActivity(activityData._id)} />
                                        </IconButton>
                                    )}
                                    <CardContent>
                                        <CardMedia
                                            style={{ height: '37vh' }}
                                        image={badgeDisplay(activityData)} 
                                        />
                                        <Typography variant="h5" component="div">
                                            {activityData.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            You visited {activityData.description}
                                        </Typography>
                                        {profile.comments?.length > 0 && (
                                            <Comments
                                                comments={profile.comments}
                                                isLoggedInUser={!profileId && true}
                                            />
                                        )}
                                    </CardContent>
                                    <CommentForm profileId={profile._id} />
                                </Card>
                            </div>
                        )
                        )}
                </div>
            </Grid>
        </div>
    );
};

export default Badges;