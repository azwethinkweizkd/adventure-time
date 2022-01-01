import React from 'react';
import { useMutation } from '@apollo/client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { REMOVE_COMMENT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const Comments = ({ activityId, comments, isLoggedInUser = false }) => {
    const [removeComment, { error }] = useMutation(REMOVE_COMMENT, {
        update(cache, { data: { removeComment } }) {
            try {
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: removeComment },
                });
            } catch (e) {
                console.error(e);
            }
        },
    });

    const handleRemoveComment = async (activityId, comment) => {
        try {
            const { data } = await removeComment({
                variables: { activityId, comment },
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            {comments &&
                comments.map((comment) => (
                    <div key={comment} className="col-12 col-xl-6">
                        <Card class="commentCard">
                            <CardContent class="commentCard2">
                                <Typography color="text.secondary">
                                    {comment}
                                </Typography>
                            </CardContent>
                            {isLoggedInUser && (
                                <IconButton aria-label="delete">
                                    <DeleteIcon
                                        onClick={() => handleRemoveComment(activityId, comment)} />
                                </IconButton>
                            )}
                        </Card>
                    </div>
                ))}
            {error && (
                <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
            )}
        </div>
    );
};

export default Comments;