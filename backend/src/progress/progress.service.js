"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressService = void 0;
/* eslint-disable prettier/prettier */
const common_1 = require("@nestjs/common");
const mongoose_1 = __importDefault(require("mongoose"));
const PDFDocument = __importStar(require("pdfkit"));
let ProgressService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ProgressService = _classThis = class {
        constructor(progressModel, responseModel, courseModel, quizModel, moduleModel, ratingModel, ratingService) {
            this.progressModel = progressModel;
            this.responseModel = responseModel;
            this.courseModel = courseModel;
            this.quizModel = quizModel;
            this.moduleModel = moduleModel;
            this.ratingModel = ratingModel;
            this.ratingService = ratingService;
        }
        create(createProgressDto) {
            return __awaiter(this, void 0, void 0, function* () {
                const newProgress = new this.progressModel(createProgressDto);
                return newProgress.save();
            });
        }
        findAll() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.progressModel.find().exec();
            });
        }
        findOne(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const progress = yield this.progressModel.findOne({ _id: id }).exec();
                if (!progress) {
                    throw new common_1.NotFoundException(`Progress record with ID ${id} not found`);
                }
                return progress;
            });
        }
        update(id, updateProgressDto) {
            return __awaiter(this, void 0, void 0, function* () {
                const updatedProgress = yield this.progressModel
                    .findByIdAndUpdate(id, updateProgressDto, { new: true }).exec();
                if (!updatedProgress) {
                    throw new common_1.NotFoundException(`Progress record with ID ${id} not found`);
                }
                return updatedProgress;
            });
        }
        delete(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield this.progressModel.deleteOne({ _id: id }).exec();
                if (result.deletedCount === 0) {
                    throw new common_1.NotFoundException(`Progress record with ID ${id} not found`);
                }
            });
        }
        getCompletedCourses(userId) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.progressModel
                    .find({
                    user_id: new mongoose_1.default.Types.ObjectId(userId),
                    completion_percentage: 100,
                })
                    .populate('course_id');
            });
        }
        // LOGIC FOR ATTENDANCE
        // RECORD ATTENDANCE
        recordAttendance(userId, courseId, status) {
            return __awaiter(this, void 0, void 0, function* () {
                const progress = yield this.progressModel.findOne({ user_id: userId, course_id: courseId }).exec();
                if (!progress) {
                    throw new common_1.NotFoundException(`Progress record for user ${userId} in course ${courseId} not found`);
                }
                const attendanceRecord = { date: new Date(), status };
                progress.attendance = progress.attendance || [];
                progress.attendance.push(attendanceRecord);
                yield progress.save();
            });
        }
        // GET ATTENDANCE
        getAttendance(userId, courseId) {
            return __awaiter(this, void 0, void 0, function* () {
                const progress = yield this.progressModel.findOne({ user_id: userId, course_id: courseId }).exec();
                if (!progress) {
                    throw new common_1.NotFoundException(`Progress record for user ${userId} in course ${courseId} not found`);
                }
                return progress.attendance || [];
            });
        }
        calculateAttendanceRate(userId, courseId) {
            return __awaiter(this, void 0, void 0, function* () {
                const progress = yield this.progressModel.findOne({
                    user_id: userId,
                    course_id: courseId,
                }).exec();
                if (!progress || !progress.attendance || progress.attendance.length === 0) {
                    return 0;
                }
                const totalDays = progress.attendance.length;
                const presentDays = progress.attendance.filter((record) => record.status === "present").length;
                const attendanceRate = (presentDays / totalDays) * 100;
                return attendanceRate;
            });
        }
        getDashboard(userId) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('Querying progress for userId:', userId);
                const progress = yield this.progressModel.findOne({ user_id: userId }).exec();
                console.log('Progress found:', progress);
                if (!progress) {
                    throw new common_1.NotFoundException(`Dashboard for user ${userId} not found`);
                }
                // Calculate student's average score for each course 
                const modules = yield this.moduleModel.find({ course_id: progress.course_id }).exec();
                console.log('course id ', progress.course_id);
                const quizIds = [];
                for (const module of modules) { //FOR EACH MODULE OF THIS COURSE - COURSE MAY HAVE MORE THAN 1 MODULE
                    const quizzes = yield this.quizModel.find({ module_id: module._id }).exec();
                    quizzes.forEach(quiz => quizIds.push(quiz._id));
                }
                const responses = yield this.responseModel.find({
                    user_id: userId,
                    quiz_id: { $in: quizIds }, //quiz_id present in quizIds array
                }).exec();
                const totalScore = responses.reduce((sum, response) => sum + (response.score || 0), 0);
                const averageScore = responses.length ? totalScore / responses.length : 0;
                const classification = yield this.classifyUserPerformance(userId.toString());
                // Calculate course completion rate 
                const progressData = yield this.progressModel.find({ user_id: userId }).exec();
                const courseCompletionRates = [];
                const completedCourses = [];
                for (const progress of progressData) {
                    const course = yield this.courseModel.findById(progress.course_id).exec();
                    const completionRate = progress.completion_percentage;
                    courseCompletionRates.push({
                        //   courseTitle: course.title,
                        completionRate: completionRate,
                    });
                    if (completionRate === 100) {
                        const course = yield this.courseModel.findById(progress.course_id).exec();
                        completedCourses.push({
                            courseId: progress.course_id,
                            // courseTitle: course?.title || 'Unknown Course', 
                        });
                    }
                }
                // Engagement trends [attendance, how many students completed the course] 
                const engagementTrends = [];
                for (const progress of progressData) {
                    const courseId = progress.course_id;
                    const courseIdString = courseId.toString();
                    const attendanceRate = yield this.calculateAttendanceRate(userId, courseIdString);
                    const completedStudents = yield this.progressModel.find({
                        course_id: courseId,
                        completion_percentage: 100,
                    }).exec();
                    const completedStudentCount = completedStudents.length;
                    engagementTrends.push({
                        courseId: courseIdString,
                        attendanceRate,
                        completedStudentCount,
                    });
                }
                return {
                    averageScore,
                    classification,
                    completedCourses,
                    courseCompletionRates,
                    engagementTrends,
                    progress,
                };
            });
        }
        classifyUserPerformance(userId) {
            return __awaiter(this, void 0, void 0, function* () {
                const responses = yield this.responseModel.find({ user_id: userId }).exec();
                const totalScore = responses.reduce((sum, response) => sum + (response.score || 0), 0);
                const averageScore = responses.length ? totalScore / responses.length : 0;
                if (averageScore < 50) {
                    return 'Below Average';
                }
                else if (averageScore >= 50 && averageScore < 70) {
                    return 'Average';
                }
                else if (averageScore >= 70 && averageScore < 90) {
                    return 'Above Average';
                }
                else {
                    return 'Excellent';
                }
            });
        }
        // Instructor Analytics -- student engagement 
        getInstructorAnalyticsStudentEngagement(courseId) {
            return __awaiter(this, void 0, void 0, function* () {
                const course = yield this.courseModel.findById(courseId).exec();
                //if (!course) {
                //throw new Error('Course not found');
                // }
                // Number of enrolled students
                const enrolledStudents = yield this.progressModel.distinct('user_id', { course_id: courseId }).exec();
                // Number of students completed the course
                const completedStudents = yield this.progressModel.find({ course_id: courseId, completion_percentage: 100, }).exec();
                const completedStudentCount = completedStudents.length;
                // Number of students based on performance metrics
                const performanceMetrics = {
                    belowAverage: 0,
                    average: 0,
                    aboveAverage: 0,
                    excellent: 0,
                };
                for (const studentId of enrolledStudents) {
                    const classification = yield this.classifyUserPerformance(studentId.toString());
                    if (classification === 'Below Average') {
                        performanceMetrics.belowAverage += 1;
                    }
                    else if (classification === 'Average') {
                        performanceMetrics.average += 1;
                    }
                    else if (classification === 'Above Average') {
                        performanceMetrics.aboveAverage += 1;
                    }
                    else if (classification === 'Excellent') {
                        performanceMetrics.excellent += 1;
                    }
                }
                return {
                    enrolledStudentsCount: enrolledStudents.length,
                    completedStudentsCount: completedStudentCount,
                    performanceMetrics,
                };
            });
        }
        // Instructor Analytics -- Reports on content effectiveness 
        getInstructorAnalyticsContentEffectiveness(courseId, userId) {
            return __awaiter(this, void 0, void 0, function* () {
                const course = yield this.courseModel.findById(courseId).exec();
                //if (!course) {
                //throw new NotFoundException('Course not found');
                //}
                //const instructor = await this.courseModel.findById(userId).exec();
                //if (!instructor) {
                //throw new NotFoundException('Instructor not found');
                //}
                const courseRating = yield this.ratingService.getCourseRating(courseId);
                const modules = yield this.moduleModel.find({ course_id: courseId }).exec();
                const moduleRatings = {};
                for (const module of modules) {
                    const moduleIdStr = module._id.toString();
                    const moduleRating = yield this.ratingService.getModuleRating(moduleIdStr);
                    moduleRatings[moduleIdStr] = moduleRating;
                }
                const instructorRating = yield this.ratingService.getInstructorRating(userId);
                return {
                    courseId,
                    //courseTitle: course.title,
                    courseRating,
                    moduleRatings,
                    instructorRating,
                };
            });
        }
        //Instructor Analytics -- Reports on assessment results 
        getInstructorAnalyticsAssessmentResults(courseId) {
            return __awaiter(this, void 0, void 0, function* () {
                const course = yield this.courseModel.findById(courseId).exec();
                // if (!course) {
                //   throw new Error('Course not found');
                // }
                const quizzes = yield this.quizModel.find({ course_id: courseId }).exec();
                // if (!quizzes || quizzes.length === 0) {
                //   return { message: 'No quizzes available for this course', results: [] };
                // }
                const results = [];
                for (const quiz of quizzes) {
                    const responses = yield this.responseModel.find({ quiz_id: quiz._id }).exec();
                    const totalScores = responses.reduce((sum, response) => sum + response.score, 0);
                    const numParticipants = responses.length;
                    const averageScore = numParticipants > 0 ? totalScores / numParticipants : 0;
                    results.push({
                        quizId: quiz._id,
                        averageScore,
                        numParticipants,
                    });
                }
                return { courseId, courseName: course.title, results };
            });
        }
        // Downloadable Analytics for student engagement --allow instructors to download detailed reports about student progress and performance.
        exportInstructorAnalyticsStudentEngagementPDF(courseId, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const analytics = yield this.getInstructorAnalyticsStudentEngagement(courseId);
                // if (!analytics) {
                //   return res.status(404).send('Analytics data not found');
                // }
                const doc = new PDFDocument();
                res.header('Content-Type', 'application/pdf');
                res.attachment('instructor_analytics_student_engagement.pdf');
                doc.pipe(res);
                doc.fontSize(16).text('Instructor Analytics Report - student engagement', { align: 'center' }).moveDown();
                doc.text(`Number of enrolled students: ${analytics.enrolledStudentsCount}`).moveDown();
                doc.text(`Number of students who completed the course: ${analytics.completedStudentsCount}`).moveDown();
                doc.text('Performance Metrics:').moveDown();
                doc.text(`Number of students who are below average: ${analytics.performanceMetrics.belowAverage}`).moveDown();
                doc.text(`Number of students who are Average: ${analytics.performanceMetrics.average}`).moveDown();
                doc.text(`Number of students who are Above Average: ${analytics.performanceMetrics.aboveAverage}`).moveDown();
                doc.text(`Number of students who are Excellent: ${analytics.performanceMetrics.excellent}`).moveDown();
                doc.end();
            });
        }
        //Downloadable Analytics for content effectiveness 
        exportInstructorAnalyticsContentEffectivenessPDF(courseId, userId, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const analytics = yield this.getInstructorAnalyticsContentEffectiveness(courseId, userId);
                // if (!analytics) {
                //   return res.status(404).send('Analytics data not found');
                // }
                const doc = new PDFDocument();
                res.header('Content-Type', 'application/pdf');
                res.attachment('instructor_analytics_content_effectiveness.pdf');
                doc.pipe(res);
                doc.fontSize(16).text('Instructor Analytics Report - Content Effectiveness', { align: 'center' }).moveDown();
                //doc.text(`Course Title: ${analytics.courseTitle}`).moveDown();
                doc.text(`Course Rating: ${analytics.courseRating}`).moveDown();
                doc.text('Module Ratings:');
                for (const [moduleId, rating] of Object.entries(analytics.moduleRatings)) {
                    doc.text(`Module ID: ${moduleId}, Rating: ${rating}`).moveDown();
                }
                doc.text(`Instructor Rating: ${analytics.instructorRating}`).moveDown();
                doc.end();
            });
        }
        //Downlodable Analytics for Assessment Results 
        exportInstructorAnalyticsAssessmentResultsPDF(courseId, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const analytics = yield this.getInstructorAnalyticsAssessmentResults(courseId);
                // if (!analytics.results || analytics.results.length === 0) {
                //   return res.status(404).send('No assessment results found for this course.');
                // }
                const doc = new PDFDocument();
                res.header('Content-Type', 'application/pdf');
                res.attachment('instructor_analytics_assessment_results.pdf');
                doc.pipe(res);
                doc.fontSize(16).text('Instructor Analytics - Assessment Results', { align: 'center' }).moveDown();
                doc.text(`Course: ${analytics.courseName}`);
                doc.text(`Course ID: ${analytics.courseId}`).moveDown();
                doc.text('Assessment Results:', { underline: true }).moveDown();
                analytics.results.forEach(result => {
                    doc.text(`Quiz ID: ${result.quizId}`);
                    doc.text(`Average Score: ${result.averageScore}`);
                    doc.text(`Number of Participants: ${result.numParticipants}`).moveDown();
                });
                doc.end();
            });
        }
        getStudentPerformace(userId, courseId) {
            return __awaiter(this, void 0, void 0, function* () {
                const quizzes = yield this.quizModel.find({ course_id: courseId });
                const quizPerformanceList = [];
                for (const quiz of quizzes) {
                    const performance = yield this.responseModel.findOne({ user_id: userId, quiz_id: quiz._id });
                    if (performance) {
                        quizPerformanceList.push({
                            quizId: quiz._id,
                            score: performance.score,
                            SubmittedAt: performance.submittedAt
                        });
                    }
                }
                return quizPerformanceList;
            });
        }
    };
    __setFunctionName(_classThis, "ProgressService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProgressService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProgressService = _classThis;
})();
exports.ProgressService = ProgressService;
