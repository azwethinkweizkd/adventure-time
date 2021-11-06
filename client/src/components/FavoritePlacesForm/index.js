import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_FAVORITEPLACES } from '../../utils/mutations';

const FavoritePlaces = ({ profileId }) => {
    const [place, setFavoritePlaces] = useState('');

    const [addFavoritePlaces, { error }] = useMutation(ADD_FAVORITEPLACES);

    // update state based on form input changes
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await addFavoritePlaces({
                variables: { profileId, place },
            });

            setFavoritePlaces('');
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
                        placeholder="Enter a favorite place"
                        value={place}
                        className="form-input w-100"
                        onChange={(event) => setFavoritePlaces(event.target.value)}
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

export default FavoritePlaces;