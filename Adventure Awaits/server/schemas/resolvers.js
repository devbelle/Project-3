const { User, Trip } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
require("dotenv").config();


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("trips");
      }
      throw AuthenticationError;
    },
    getRestaurants: async (parent, { city }, context) => {
      try {
        const url = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=${city}`;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.APIKEY,
            "X-RapidAPI-Host": process.env.APIHOST,
          },
        };

        const cityId = await fetch(url, options);
        const cityIdData = await cityId.json();

        const locationId = cityIdData.data[0].locationId;
        const requestUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=${locationId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.APIKEY,
            "X-RapidAPI-Host": process.env.APIHOST,
          },
        };
        const response = await fetch(requestUrl, requestOptions);
        const data = await response.json();

        const restaurant = data.data.data;
        console.log(restaurant);
        return restaurant;
      } catch (error) {
        console.log(error);
        throw AuthenticationError;
      }
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
