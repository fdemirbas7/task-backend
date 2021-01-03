import { Event } from './models/Event';
import { PubSub } from 'apollo-server-express';

const pubsub = new PubSub();
export const resolvers = {
  Query: {
    event: async (_, { leadId }) => {
      const event = await Event.findOne({ leadId });
      return event;
    },
    events: async () => await Event.find(),
  },
  Mutation: {
    createEvent: (_, { name, leadId }) => {
      const event = new Event({ leadId, name, value: 1 });
      return event.save();
    },
    updateEvent: async (_, { leadId, payload }) => {
      const event = await Event.findOne({ leadId });
      event.value += payload;
      pubsub.publish('EVENT_UPDATED', {
        eventUpdated: {
          leadId,
          value: event.value,
        },
      });
      return event.save();
    },
  },
  Subscription: {
    eventUpdated: {
      subscribe: () => {
        return pubsub.asyncIterator('EVENT_UPDATED');
      },
    },
  },
};
