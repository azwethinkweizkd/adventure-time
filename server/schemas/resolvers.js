const {
  AuthenticationError,
  PubSub,
  withFilter,
} = require("apollo-server-express");
const { Profile, Activity, Message } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    messages: async () => {
      return Message.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId }).populate("activities");
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id }).populate(
          "activities"
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    activities: async () => {
      return Activity.find().sort({ createdAt: -1 });
    },
    activity: async (parent, { activityId }) => {
      const activity = await Activity.findById(activityId);
      if (activity) {
        return activity;
      } else {
        throw new Error("Activity not found");
      }
    },
  },

  Message: {
    profiles: async ({ senderName }) => {
      return Profile.find({ name: senderName });
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
        const updatedUser = await Profile.findByIdAndUpdate(
          { _id: profileId },
          { $addToSet: { activities: activityCreate._id } },
          { new: true }
        );
        return updatedUser;
      }

      throw new AuthenticationError(
        "Error! You need to be logged in to save your activity!"
      );
    },
    addComment: async (parent, { activityId, comment }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return Activity.findOneAndUpdate(
          { _id: activityId },
          { $addToSet: { comments: comment } },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError("You need to be logged in!");
    },
    removeActivity: async (parent, { activityId }, context) => {
      if (context.user) {
        await Activity.findOneAndDelete({
          _id: activityId,
          profile: context.user._id,
        });
        return await Profile.findOneAndDelete(
          { _id: context.user._id },
          { $push: { activity: activityId } },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeComment: async (parent, { comment }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { activities: { activityId } } },
          { new: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError(
        "Error! You need to be logged in to delete your activity!"
      );
    },

    userTyping: (_, { name, receiverName }) => {
      pubsub.publish("userTyping", {
        userTyping: name,
        receiverName,
      });
      return true;
    },

    sendMessage: async (
      _,
      { senderName, receiverName, message, timestamp }
    ) => {
      const userText = new Message({
        senderName,
        receiverName,
        message,
        timestamp,
      });
      await userText.save();
      pubsub.publish("newMessage", {
        newMessage: userText,
        receiverName,
      });
      return userText;
    },

    updateMessage: async (_, { id, message }) => {
      const userText = await Message.findOneAndUpdate(
        { _id: id },
        { message },
        { new: true }
      );
      return userText;
    },

    deleteMessage: async (_, { id }) => {
      await Message.findOneAndDelete({ _id: id });
      return true;
    },
  },
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("newMessage"),
        (payload, variables) => {
          return payload.receiverName === variables.receiverName;
        }
      ),
    },
    newUser: {
      subscribe: (_, {}, { pubsub }) => {
        return pubsub.asyncIterator("newUser");
      },
    },
    oldUser: {
      subscribe: (_, {}, { pubsub }) => {
        return pubsub.asyncIterator("oldUser");
      },
    },
    userTyping: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("userTyping"),
        (payload, variables) => {
          return payload.receiverName === variables.receiverName;
        }
      ),
    },
  },
};
const pubsub = new PubSub();
module.exports = resolvers;
