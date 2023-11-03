import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import AboutMeDashboard from "../components/AboutMeDashboard";
import Badges from "../components/Badges";

import { QUERY_SINGLE_PROFILE, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Dashboard = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }
  return (
    <div class="flex">
      <>
        <Badges
          activities={profile.activities}
          comments={profile.activities.comments}
          isLoggedInUser={!profileId && true}
        />
        <AboutMeDashboard
          residency={profile.residency}
          myActivities={profile.myActivities}
          favoritePlaces={profile.favoritePlaces}
          futurePlaces={profile.futurePlaces}
          isLoggedInUser={!profileId && true}
        />
      </>
    </div>
  );
};

export default Dashboard;
