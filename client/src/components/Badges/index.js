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
import TextField from '@mui/material/TextField';
// import Comments from '../Comments';

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
            <>
            <Grid container spacing={2} justifyContent="center">
                {
                BadgeData.map((props) => {
                    return (
                    <Card className={classes.media} sx={{ minWidth: 275, m: 3 }}>
                        <Card sx={{ minWidth: 275, m: 3 }}>
                            <CardActionArea>
                                <CardMedia
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
                        <h5>Add Comment</h5>
                        <TextField className={classes.textField} id="outlined-basic" label="Outlined" variant="outlined" />
                        <button
                        className="btn btn-sm btn-danger ml-auto"
                        /*  onClick={() => handleRemoveActivity(activity)} */
                        >X
                        </button>
                    </Card>
                    )
                })
                }</Grid>
            </>
        </div>
    );
};

export default Badges;