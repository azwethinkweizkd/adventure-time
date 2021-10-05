import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_COMMENT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Comments = ({ comments, isLoggedInUser = false }) => {
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
            <div className="flex-row justify-space-between my-4">
                {comments &&
                    comments.map((comment) => (
                        <div key={comment} className="col-12 col-xl-6">
                            <div className="card mb-3">
                                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                                    <span>{comment}</span>
                                    {isLoggedInUser && (
                                        <button
                                            className="btn btn-sm btn-danger ml-auto"
                                            onClick={() => handleRemoveComment(comment)}
                                        >
                                            X
                                        </button>
                                    )}
                                </h4>
                            </div>
                        </div>
                    ))}
            </div>
            {error && (
                <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
            )}
            <Card sx={{ minWidth: 275, m: 3}} >
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                    benevolent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
        </Card>
        </div>
    );
};

export default Comments;