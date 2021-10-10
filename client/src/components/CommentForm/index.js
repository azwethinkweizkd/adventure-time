import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import AddCommentIcon from '@mui/icons-material/AddComment';
import IconButton from '@mui/material/IconButton';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ activityId }) => {
    const [comment, setComment] = useState('');

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await addComment({
                variables: { activityId, comment },
            });

            setComment('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {Auth.loggedIn() ? (
                <form
                    className="flex-row justify-center justify-space-between-md align-center"
                    onSubmit={handleFormSubmit}
                >
                    <div className="col-12 col-lg-9">
                        <input
                            placeholder="Add a comment..."
                            value={comment}
                            className="form-input w-100"
                            onChange={(event) => setComment(event.target.value)}
                        />
                    </div>

                    <div className="col-12 col-lg-3">
                        <IconButton aria-label="add" type="submit">
                            <AddCommentIcon />
                        </IconButton>
                    </div>
                    {error && (
                        <div className="col-12 my-3 bg-danger text-white p-3">
                            {error.message}
                        </div>
                    )}
                </form>
            ) : (
                <p>
                    You need to be logged in to endorse comments. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
};

export default CommentForm;