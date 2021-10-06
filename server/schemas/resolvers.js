const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    // Add a third argument to the resolver to access data in our `context`
    addComment: async (parent, { profileId, comment }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          {
            $addToSet: { comments: comment },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },

    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeComment: async (parent, { comment }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { comments: comment } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    saveActivity: async (parent, { activityData }, context) => {
      if (context.user) {
        const updatedUser = await Profile.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedActivity: activityData } },
          { new: true }
        ).populate;

        return updatedUser;
      }

      throw new AuthenticationError('Error! You need to be logged in to save your activity!');
    },

    removeActivity: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedActivity: { activityId: args.activityId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('Error! Your activity was unable to be deleted!');
    }
  },
};

module.exports = resolvers;
