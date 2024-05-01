const { User, Trip } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("trips");
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;

      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;

      }

      const token = signToken(user);
      console.log(token);

      return { token, user };
    },

    addTrip: async (
      parent,
      { title, destination, startDate, endDate, notes },
      context
    ) => {
      if (context.user) {
        const trip = await Trip.create({
          title,
          destination,
          startDate,
          endDate,
          notes,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { trips: trip._id },
          }
        ),
          {
            new: true,
            runValidators: true,
          };
      }
      throw AuthenticationError;
    },

    updateTrip: async (
      parent,
      { tripId, title, destination, startDate, endDate, notes }
    ) => {
      return await Trip.findOneAndUpdate(
        { _id: tripId },
        {
          $set: {
            title,
            destination,
            startDate,
            endDate,
            notes,
          },
        },
        { new: true }
      );
    },

    removeTrip: async (parent, { tripId }, context) => {
      if (context.user) {
        const trip = await Trip.findOneAndDelete({
          _id: tripId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { trips: trip._id } }
        );

        return trip;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
