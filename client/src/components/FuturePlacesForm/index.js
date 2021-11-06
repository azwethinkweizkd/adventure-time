import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_FUTUREPLACES } from '../../utils/mutations';

const FuturePlaces = ({ profileId }) => {
    const [ futurePlace, setFuturePlaces] = useState('');

    const [addFuturePlaces, { error }] = useMutation(ADD_FUTUREPLACES);

    // update state based on form input changes
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await addFuturePlaces({
                variables: { profileId, futurePlace },
            });

            setFuturePlaces('');
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
                        placeholder="Enter places you still want to go"
                        value={futurePlace}
                        className="form-input w-100"
                        onChange={(event) => setFuturePlaces(event.target.value)}
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

export default FuturePlaces;