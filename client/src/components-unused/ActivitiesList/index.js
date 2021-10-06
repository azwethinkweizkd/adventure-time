import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_ACTIVITY } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const ActivitiesList = ({ activities, isLoggedInUser = false }) => {
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

  if (!activities.length) {
    return <h3>No activities Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {activities &&
          activities.map((activity) => (
            <div key={activity} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{activity}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveActivity(activity)}
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
    </div>
  );
};

export default ActivitiesList;