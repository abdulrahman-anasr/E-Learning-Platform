"use strict";
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
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const quiz_question_dto_1 = require("./DTO/quiz.question.dto");
const mongoose_2 = __importDefault(require("mongoose"));
let QuizService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var QuizService = _classThis = class {
        constructor(quizModel, moduleModel, questionBankModel, userModel, progressModel, responsesModel, progressService) {
            this.quizModel = quizModel;
            this.moduleModel = moduleModel;
            this.questionBankModel = questionBankModel;
            this.userModel = userModel;
            this.progressModel = progressModel;
            this.responsesModel = responsesModel;
            this.progressService = progressService;
        }
        findAll() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.quizModel.find();
            });
        }
        findById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const inpStr = id;
                const objectId = new mongoose_2.default.Types.ObjectId(inpStr);
                return yield this.quizModel.findById(objectId).exec();
            });
        }
        findByUserId(userId) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('Querying quiz for userId:', userId);
                const objectId = new mongoose_2.default.Types.ObjectId(userId);
                const quiz = yield this.quizModel.findOne({ userId: objectId }).exec();
                return quiz;
            });
        }
        update(id, updateData) {
            return __awaiter(this, void 0, void 0, function* () {
                const inpStr = id;
                const objectId = new mongoose_2.default.Types.ObjectId(inpStr);
                return yield this.quizModel.findByIdAndUpdate(objectId, updateData, { new: true }).exec();
            });
        }
        delete(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const inpStr = id;
                const objectId = new mongoose_2.default.Types.ObjectId(inpStr);
                return yield this.quizModel.findByIdAndDelete(objectId).exec();
            });
        }
        // DONT TOUCH THIS VODOO ( IT WORKS AND IDK HOW )
        generateQuiz(createQuizDto, userId) {
            return __awaiter(this, void 0, void 0, function* () {
                const { moduleId, numberOfQuestions, questionType, questionIds } = createQuizDto;
                createQuizDto['user_id'] = userId;
                const allQuestions = yield this.questionBankModel.find();
                //console.log('All Questions from Question Bank:', allQuestions);
                const performanceMetric = yield this.progressService.classifyUserPerformance(userId);
                let difficultyLevels;
                if (performanceMetric === 'Above Average') {
                    difficultyLevels = [quiz_question_dto_1.DifficultyLevel.Medium, quiz_question_dto_1.DifficultyLevel.Hard];
                }
                else if (performanceMetric === 'Average') {
                    difficultyLevels = [quiz_question_dto_1.DifficultyLevel.Easy, quiz_question_dto_1.DifficultyLevel.Medium];
                }
                else if (performanceMetric === 'Below Average') {
                    difficultyLevels = [quiz_question_dto_1.DifficultyLevel.Easy];
                }
                else {
                    difficultyLevels = [quiz_question_dto_1.DifficultyLevel.Hard];
                }
                console.log('Input Filter Conditions:', {
                    moduleId,
                    difficultyLevels,
                    questionType,
                });
                let questionFilter = {
                    module_id: moduleId,
                    difficulty_level: { $in: difficultyLevels },
                };
                console.log('Question Type from DTO:', questionType);
                if (questionType === quiz_question_dto_1.QuestionType.MCQ) {
                    questionFilter.question_type = 'MCQ';
                }
                else if (questionType === quiz_question_dto_1.QuestionType.TrueFalse) {
                    questionFilter.question_type = 'True/False';
                }
                else {
                    questionFilter.question_type = { $in: ['MCQ', 'True/False'] };
                }
                const questions = allQuestions.filter((q) => {
                    var _a, _b;
                    console.log('Filtering question:', q);
                    console.log('Question type from DB:', q.question_type);
                    console.log('Question Filter Type:', questionFilter.question_type);
                    const matchesType = ((_b = (_a = questionFilter.question_type) === null || _a === void 0 ? void 0 : _a.$in) === null || _b === void 0 ? void 0 : _b.includes(q.question_type)) ||
                        questionFilter.question_type === q.question_type;
                    console.log('Matches type:', matchesType);
                    const matchesDifficulty = difficultyLevels.includes(q.difficulty_level);
                    console.log('Matches difficulty:', matchesDifficulty);
                    const isModuleMatch = q.module_id.toString() === moduleId.toString();
                    console.log('Module ID matches:', isModuleMatch);
                    return (isModuleMatch &&
                        matchesDifficulty &&
                        matchesType);
                });
                console.log('Filtered Questions:', questions);
                if (questions.length === 0) {
                    console.log('No questions matched the filter conditions.');
                }
                const selectedQuestions = this.getRandomQuestions(questions, numberOfQuestions);
                console.log('Selected Questions:', selectedQuestions);
                const transformedQuestions = selectedQuestions.map((q) => ({
                    questionId: q._id,
                    question: q.question,
                    options: q.options,
                    correct_answer: q.correct_answer,
                    difficultyLevel: q.difficulty_level,
                }));
                console.log("trans questions", transformedQuestions);
                const extractedQuestionIds = [];
                transformedQuestions.forEach(function (value) {
                    extractedQuestionIds.push(new mongoose_1.Types.ObjectId(value.questionId));
                });
                console.log("Extracted: " + extractedQuestionIds);
                const quiz = {
                    module_id: moduleId,
                    question_ids: extractedQuestionIds,
                    questions: transformedQuestions,
                    created_at: new Date(),
                    userId: new mongoose_2.default.Types.ObjectId(userId),
                };
                const savedQuiz = yield new this.quizModel(quiz).save();
                console.log('Saved Quiz:', savedQuiz);
                yield this.userModel.findByIdAndUpdate(userId, { $push: { quizzes: savedQuiz._id } }, { new: true });
                const responseQuestions = selectedQuestions.map((q) => ({
                    question: q.question,
                    options: q.options,
                    questionId: q._id,
                }));
                return {
                    quizId: savedQuiz._id,
                    questions: responseQuestions,
                };
            });
        }
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        getRandomQuestions(questions, count) {
            console.log("Number of Questions Selected:", count);
            console.log("Total Available Questions:", questions.length);
            const validCount = Math.min(count, questions.length);
            console.log("Valid Count for Selection:", validCount);
            return this.shuffleArray(questions).slice(0, validCount);
        }
        evaluateQuiz(userAnswers, selectedQuestions, userId, quizId) {
            return __awaiter(this, void 0, void 0, function* () {
                let correctAnswersCount = 0;
                let incorrectAnswers = [];
                // Fetch correct answers using question IDs
                const question_ids = selectedQuestions.map((q) => q.questionId);
                const fetchedQuestions = yield this.questionBankModel.find({ _id: { $in: question_ids } });
                const questionMap = fetchedQuestions.reduce((map, question) => {
                    map[question._id.toString()] = question.correct_answer;
                    return map;
                }, {});
                const answersToSave = [];
                selectedQuestions.forEach((question, index) => {
                    const userAnswer = userAnswers[index];
                    const correctAnswer = questionMap[question.questionId];
                    answersToSave.push({
                        questionId: question.questionId,
                        answer: userAnswer,
                    });
                    if (userAnswer === correctAnswer) {
                        correctAnswersCount++;
                    }
                    else {
                        incorrectAnswers.push({
                            question: question.question,
                            correctAnswer: correctAnswer || "N/A",
                            userAnswer: userAnswer || "N/A",
                        });
                    }
                });
                const score = (correctAnswersCount / selectedQuestions.length) * 100;
                let feedbackMessage = '';
                if (score < 60) {
                    feedbackMessage = 'You have not scored enough. We recommend revisiting the module content and studying the material again.';
                }
                else {
                    feedbackMessage = 'Great job! You have passed the quiz. Keep up the good work!';
                }
                // Save the results in the Responses schema
                const responseDocument = new this.responsesModel({
                    user_id: new mongoose_2.default.Types.ObjectId(userId),
                    quiz_id: quizId, // Use quizId passed from Postman
                    answers: answersToSave,
                    score,
                    submittedAt: new Date(),
                });
                yield responseDocument.save();
                return {
                    score,
                    feedback: feedbackMessage,
                    incorrectAnswers,
                };
            });
        }
    };
    __setFunctionName(_classThis, "QuizService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        QuizService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return QuizService = _classThis;
})();
exports.QuizService = QuizService;
