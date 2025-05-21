export interface progress {
    _id: object,
    user_id: object,
    course_id: object,
    completion_percentage: number,
    last_accessed: Date,
    attendance: [],
}
export interface DashboardData {
  averageScore: number;
  classification: string;
  completedCourses: { courseId: string }[];
  courseCompletionRates: { completionRate: number }[];
  engagementTrends: { courseId: string; attendanceRate: number; completedStudentCount: number }[];
}

export interface responses {
    _id: object,
    user_id: object,
    quiz_id: object,
    answers: [],
    score: number,
    submittedAt: Date,
    createdAt: Date,
    updatedAt: Date,
}

export interface ratings {
    _id: object,
    rating: number,
    ratedEntity: string,
    ratedEntityId: object,
    user_id: object,
    created_at: Date,
}

