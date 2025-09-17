import mongoose, { Document, Schema } from 'mongoose';

export interface IProblem extends Document {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  isPro: boolean;
  order: number;
  leetcodeUrl?: string;
  videoUrl?: string;
  hints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  followUp?: string;
  tags: string[];
  acceptanceRate?: number;
  totalSubmissions?: number;
  totalAccepted?: number;
  slug?: string;
  sourcePath?: string;
  createdAt: Date;
  updatedAt: Date;
}

const problemSchema = new Schema<IProblem>({
  title: {
    type: String,
    required: [true, 'Problem title is required'],
    trim: true,
    maxlength: [200, 'Title must be less than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Problem description is required']
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty is required'],
    enum: {
      values: ['Easy', 'Medium', 'Hard'],
      message: 'Difficulty must be either Easy, Medium, or Hard'
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: [
        'arrays-hashing',
        'two-pointers',
        'sliding-window',
      ],
      message: 'Invalid category'
    }
  },
  isPro: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    required: [true, 'Order is required'],
    min: [1, 'Order must be at least 1']
  },
  leetcodeUrl: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  hints: [{
    type: String,
    default: []
  }],
  examples: [{
    input: {
      type: String,
      required: true
    },
    output: {
      type: String,
      required: true
    },
    explanation: {
      type: String,
      default: ''
    }
  }],
  constraints: [{
    type: String,
    default: []
  }],
  followUp: {
    type: String,
    default: ''
  },
  tags: [{
    type: String,
    default: []
  }],
  acceptanceRate: {
    type: Number,
    min: [0, 'Acceptance rate cannot be negative'],
    max: [100, 'Acceptance rate cannot exceed 100'],
    default: 0
  },
  totalSubmissions: {
    type: Number,
    min: [0, 'Total submissions cannot be negative'],
    default: 0
  },
  totalAccepted: {
    type: Number,
    min: [0, 'Total accepted cannot be negative'],
    default: 0
  },
  slug: {
    type: String,
    default: undefined
  },
  sourcePath: {
    type: String,
    default: undefined
  }
}, {
  timestamps: true
});

// Indexes for better performance
problemSchema.index({ category: 1, order: 1 });
problemSchema.index({ difficulty: 1 });
problemSchema.index({ isPro: 1 });
problemSchema.index({ title: 'text', description: 'text' });
problemSchema.index({ category: 1, slug: 1 }, { unique: true, sparse: true });

export default mongoose.model<IProblem>('Problem', problemSchema);
