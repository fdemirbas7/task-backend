import mongoose from 'mongoose';

export const Event = mongoose.model('Event', {
  name: String,
  leadId: String,
  value: Number,
});
