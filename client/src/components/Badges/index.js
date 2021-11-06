import React from 'react';
import badgeData from '../../utils/badges.json';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Comments from '../Comments';
import CommentForm from '../CommentForm';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../../utils/queries';

const Badges = ({ activities }) => {
    const { profileId } = useParams();

    const { loading, data } = useQuery(
        profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
        {
            variables: { profileId: profileId },
        }
    );

    const profile = data?.me || data?.profile || {};

    const badgeDisplay = (activity) => {
        for (let i = 0; i < badgeData.length; i++) {
            const element = badgeData[i];
            if (activity.title === element.name) {
                return `${element.image}`
            }
        }
    }
    if (!activities.length) {
        return <h3>No Adventures Yet</h3>;
    }
    return (
        <div class="w3-row-padding w3-center w3-section">
            <h2 className="card-header">
                {profileId ? `${profile.name}'s` : 'Your'} Badges
            </h2>
            <div class="w3-col">
                {activities &&
                    activities.map((activityData) => (
                        <div key={activityData._id} class="card2">
                            <img class="card2__img" src={badgeDisplay(activityData)} alt={activityData.title} />
                            <h2 class="card2__title">{activityData.title}</h2>
                            <p class="card2__text">You visited {activityData.description}.</p>
                            {activityData.comments?.length > 0 && (
                                    <Comments
                                    comments={activityData.comments}
                                    isLoggedInUser={!profileId && true}
                                    />
                                )}
                            <CommentForm activityId={activityData._id} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Badges;