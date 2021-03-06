const { AuthenticationError } = require("apollo-server-express");
const { Profile } = require("../models");
const { Activity } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findById(profileId).populate("activities");
    },

    activity: async (parent, { activityId }) => {
      return Activity.findById(activityId).populate("comments");
    },

    me: async (parent, args, context) => {
      if (context.user) {
        try {
          return Profile.findById(context.user._id).populate("activities");
        }
        catch (err) {
          console.error(err);
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password, residency }) => {
      const profile = await Profile.create({
        name,
        email,
        password,
        residency,
      });
      const token = signToken(profile);

      return { token, profile };
    },

    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(profile);
      return { token, profile };
    },

    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addMyActivity: async (parent, { profileId, activity }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          { $addToSet: { myActivities: activity } },
          { new: true }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },

    addFavoritePlaces: async (parent, { profileId, place }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          { $addToSet: { favoritePlaces: place } },
          { new: true }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },

    addFuturePlaces: async (parent, { profileId, futurePlace }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          { $addToSet: { futurePlaces: futurePlace } },
          { new: true }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },

    addActivity: async (parent, { activityData, profileId }, context) => {
      if (context.user) {
        const activityCreate = await Activity.create(activityData);
        
        const updatedUser = await Profile.findByIdAndUpdate(context.user._id,
          { $addToSet: { activities: activityCreate._id } },
          { new: true }
        );
        return updatedUser;
      }

      throw new AuthenticationError("Error! You need to be logged in to save your activity!");
    },

    addComment: async (parent, { activityId, comment }, context) => {
      if (context.user) {
        try {
          return Activity.findOneAndUpdate(
            { _id: activityId },
            { $addToSet: { comments: comment } },
            { new: true, runValidators: true });
        }
        catch (err) {
          console.error(err);
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeActivity: async (parent, { activityId }, context) => {
      if (context.user) {

        try {
          const activityRemove = await Activity.deleteOne(
            Activity.findByIdAndDelete(activityId));
        }
        catch (err) {
          console.error(err);
          return { ok: false, message: 'Activity was not removed' };
        }

        try {
          const updatedUser = await Profile.findByIdAndUpdate(context.user._id,
            { $pull: { activities: activityId } })
        }
        catch (err) {
          console.error(err);
          return { ok: false, message: 'Activity was not removed' };
        }

        return { ok: true, message: 'Activity removed ' };
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    removeComment: async (parent, { activityId, comment }, context) => {
      if (context.user) {
        try {
          return Activity.findByIdAndUpdate(activityId,
            { $pull: { comments: comment } },
          );
        }
        catch (err) {
          console.error(err);
          return { ok: false, message: 'Comment was not removed' };
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;