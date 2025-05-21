"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizController = void 0;
const common_1 = require("@nestjs/common");
let quizController = (() => {
    let _classDecorators = [(0, common_1.Controller)('quiz')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getAllQuizzes_decorators;
    let _getQuizById_decorators;
    let _getQuizByUserId_decorators;
    let _updateQuiz_decorators;
    let _deleteQuiz_decorators;
    let _generateQuiz_decorators;
    let _evaluateQuiz_decorators;
    var quizController = _classThis = class {
        constructor(quizService) {
            this.quizService = (__runInitializers(this, _instanceExtraInitializers), quizService);
        }
        getAllQuizzes() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.quizService.findAll();
            });
        }
        getQuizById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('Received ID: ' + id);
                const quiz = yield this.quizService.findById(id);
                return quiz;
            });
        }
        getQuizByUserId(userId) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('Fetching quiz for User ID:', userId);
                const quiz = yield this.quizService.findByUserId(userId);
                if (!quiz) {
                    throw new common_1.BadRequestException('No quiz found for the provided user ID.');
                }
                return quiz;
            });
        }
        updateQuiz(id, quizData) {
            return __awaiter(this, void 0, void 0, function* () {
                const updatedQuiz = yield this.quizService.update(id, quizData);
                return updatedQuiz;
            });
        }
        deleteQuiz(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const deletedquiz = yield this.quizService.delete(id);
                return deletedquiz;
            });
        }
        generateQuiz(createQuizDto, userId) {
            return __awaiter(this, void 0, void 0, function* () {
                const quiz = yield this.quizService.generateQuiz(createQuizDto, userId);
                return {
                    success: true,
                    message: 'Quiz generated and saved successfully.',
                    data: quiz,
                };
            });
        }
        evaluateQuiz(quizId, userAnswers, selectedQuestions, userId) {
            return __awaiter(this, void 0, void 0, function* () {
                const evaluation = yield this.quizService.evaluateQuiz(userAnswers, selectedQuestions, userId, quizId); // Pass quizId to service
                return {
                    success: true,
                    message: 'Quiz evaluated successfully.',
                    data: evaluation,
                };
            });
        }
    };
    __setFunctionName(_classThis, "quizController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getAllQuizzes_decorators = [(0, common_1.Get)('findall')];
        _getQuizById_decorators = [(0, common_1.Get)('singlequiz')];
        _getQuizByUserId_decorators = [(0, common_1.Get)('assigned')];
        _updateQuiz_decorators = [(0, common_1.Put)('updatequiz')];
        _deleteQuiz_decorators = [(0, common_1.Delete)('deletequiz')];
        _generateQuiz_decorators = [(0, common_1.Post)('generateQuiz')];
        _evaluateQuiz_decorators = [(0, common_1.Post)('evaluate')];
        __esDecorate(_classThis, null, _getAllQuizzes_decorators, { kind: "method", name: "getAllQuizzes", static: false, private: false, access: { has: obj => "getAllQuizzes" in obj, get: obj => obj.getAllQuizzes }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getQuizById_decorators, { kind: "method", name: "getQuizById", static: false, private: false, access: { has: obj => "getQuizById" in obj, get: obj => obj.getQuizById }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getQuizByUserId_decorators, { kind: "method", name: "getQuizByUserId", static: false, private: false, access: { has: obj => "getQuizByUserId" in obj, get: obj => obj.getQuizByUserId }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateQuiz_decorators, { kind: "method", name: "updateQuiz", static: false, private: false, access: { has: obj => "updateQuiz" in obj, get: obj => obj.updateQuiz }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteQuiz_decorators, { kind: "method", name: "deleteQuiz", static: false, private: false, access: { has: obj => "deleteQuiz" in obj, get: obj => obj.deleteQuiz }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _generateQuiz_decorators, { kind: "method", name: "generateQuiz", static: false, private: false, access: { has: obj => "generateQuiz" in obj, get: obj => obj.generateQuiz }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _evaluateQuiz_decorators, { kind: "method", name: "evaluateQuiz", static: false, private: false, access: { has: obj => "evaluateQuiz" in obj, get: obj => obj.evaluateQuiz }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        quizController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return quizController = _classThis;
})();
exports.quizController = quizController;
