import { Schema, model, ObjectId } from 'mongoose';

export interface ActivityLog {
  createdAt: Date
  userId: ObjectId
  email: string
}

const activityLog = new Schema<ActivityLog>({
  createdAt: {type: Date, default: Date.now, require: true},
  userId: { type: Schema.Types.ObjectId, require: true },
  email: { type: String, required: true },
});

export default model<ActivityLog>('ActivityLog', activityLog);
