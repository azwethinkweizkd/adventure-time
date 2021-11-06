import React from 'react';
import { useMutation } from '@apollo/client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { REMOVE_COMMENT } from '../../utils/mutations';
import { QUERY_SINGLE_ACTIVITY } from '../../utils/queries';



const Comments = ({ comments, isLoggedInUser = false }) => {
    const [removeComment, { error }] = useMutation(REMOVE_COMMENT, {
        update(cache, { data: { removeComment } }) {
            try {
                cache.writeQuery({
                    query: QUERY_SINGLE_ACTIVITY,
                    data: { activity: removeComment },
                });
            } catch (e) {
                console.error(e);
            }
        },
    });

    const handleRemoveComment = async (comment) => {
        try {
            const { data } = await removeComment({
                variables: { comment },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {comments &&
                comments.map((comment) => (
                    <div key={comment}>
                        <Card class="card2__comment">
                            <CardContent>
                                <Typography color="text.secondary">
                                    {comment}
                                </Typography>
                            </CardContent>
                            {isLoggedInUser && (
                            <IconButton aria-label="delete">
                                <DeleteIcon
                                onClick={() => handleRemoveComment(comment)}/>
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