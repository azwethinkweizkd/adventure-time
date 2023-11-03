import React from "react";
import badgeData from "../../utils/badges.json";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import Comments from "../Comments";
import CommentForm from "../CommentForm";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { QUERY_SINGLE_PROFILE, QUERY_ME } from "../../utils/queries";

import { REMOVE_ACTIVITY } from "../../utils/mutations";

const Badges = ({ activities, isLoggedInUser = false }) => {
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

  const handleRemoveActivity = async (activityData) => {
    console.log(activityData);
    try {
      const { data } = await removeActivity({
        variables: { activityData },
      });
    } catch (err) {
      console.error("wont remove");
      console.error(err);
    }
  };

  const badgeDisplay = (activity) => {
    for (let i = 0; i < badgeData.length; i++) {
      const element = badgeData[i];
      if (activity.title === element.name) {
        return `${element.image}`;
      }
    }
  };
  if (!activities.length) {
    return (
      <>
        <h3>No Adventures Yet</h3>
      </>
    );
  }
  return (
    <>
      <div class="w3-row-padding w3-center w3-section">
        <h2 className="card-header">
          {profileId ? `${profile.name}'s` : "Your"} Badges
        </h2>
        <div class="w3-col">
          {activities &&
            activities.map((activityData) => (
              <div key={activityData._id} class="card2">
                {isLoggedInUser && (
                  <IconButton
                    aria-label="delete" /* data-id={activityData._id} */
                  >
                    <DeleteIcon /* id={activityData._id} */
                      onClick={() => handleRemoveActivity(activityData._id)}
                    />
                  </IconButton>
                )}
                <img
                  class="card2__img"
                  src={badgeDisplay(activityData)}
                  alt={activityData.title}
                />
                <h2 class="card2__title">{activityData.title}</h2>
                <p class="card2__text">
                  You visited {activityData.description}.
                </p>
                {activityData.comments?.length > 0 && (
                  <Comments
                    comments={activityData.comments}
                    isLoggedInUser={!profileId && true}
                  />
                )}
                <CommentForm activityId={activityData._id} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Badges;
