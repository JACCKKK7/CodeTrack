// filepath: /home/jack/Desktop/judge-journey/backend/src/models/Submission.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ITestResult {
  inputSummary: string;
  expected: string;
  actual: string;
  passed: boolean;
  timeMs?: number;
  error?: string;
}

export interface ISubmission extends Document {
  userId: string;
  slug: string; // problem slug
  language: 'python' | 'java';
  code: string;
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Time Limit Exceeded' | 'Failed';
  results: ITestResult[];
  stdout?: string;
  stderr?: string;
  createdAt: Date;
  updatedAt: Date;
}

const testResultSchema = new Schema<ITestResult>({
  inputSummary: { type: String, default: '' },
  expected: { type: String, default: '' },
  actual: { type: String, default: '' },
  passed: { type: Boolean, default: false },
  timeMs: { type: Number, default: 0 },
  error: { type: String, default: '' },
}, { _id: false });

const submissionSchema = new Schema<ISubmission>({
  userId: { type: String, required: true, index: true },
  slug: { type: String, required: true, index: true },
  language: { type: String, required: true, default: 'python', enum: ['python', 'java'] },
  code: { type: String, required: true },
  status: { type: String, required: true, default: 'Failed' },
  results: { type: [testResultSchema], default: [] },
  stdout: { type: String, default: '' },
  stderr: { type: String, default: '' },
}, { timestamps: true });

submissionSchema.index({ userId: 1, slug: 1, createdAt: -1 });

export default mongoose.model<ISubmission>('Submission', submissionSchema);
