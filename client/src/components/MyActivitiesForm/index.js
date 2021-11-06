import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_MYACTIVITY } from '../../utils/mutations';

const MyActivities = ({ profileId }) => {
    const [activity, setMyActivity] = useState('');

    const [addMyActivity, { error }] = useMutation(ADD_MYACTIVITY);

    // update state based on form input changes
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await addMyActivity({
                variables: { profileId, activity },
            });

            setMyActivity('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
            >
                <div className="col-12 col-lg-9">
                    <input
                        placeholder="Enter your preferred activity"
                        value={activity}
                        className="form-input w-100"
                        onChange={(event) => setMyActivity(event.target.value)}
                    />
                </div>
                <div className="col-12 col-lg-3">
                    <button className="btn btn-info btn-block py-3" type="submit">
                        Submit
                    </button>
                </div>
                {error && (
                    <div className="col-12 my-3 bg-danger text-white p-3">
                        {error.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default MyActivities;
