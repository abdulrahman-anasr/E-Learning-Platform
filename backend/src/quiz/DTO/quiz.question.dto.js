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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionDto = exports.DifficultyLevel = exports.QuestionType = void 0;
const class_validator_1 = require("class-validator");
var QuestionType;
(function (QuestionType) {
    QuestionType["MCQ"] = "MCQ";
    QuestionType["TrueFalse"] = "True/False";
    QuestionType["Both"] = "Both";
})(QuestionType || (exports.QuestionType = QuestionType = {}));
var DifficultyLevel;
(function (DifficultyLevel) {
    DifficultyLevel["Easy"] = "Easy";
    DifficultyLevel["Medium"] = "Medium";
    DifficultyLevel["Hard"] = "Hard";
})(DifficultyLevel || (exports.DifficultyLevel = DifficultyLevel = {}));
let QuestionDto = (() => {
    var _a;
    let _question_decorators;
    let _question_initializers = [];
    let _question_extraInitializers = [];
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    let _correctAnswer_decorators;
    let _correctAnswer_initializers = [];
    let _correctAnswer_extraInitializers = [];
    let _difficultyLevel_decorators;
    let _difficultyLevel_initializers = [];
    let _difficultyLevel_extraInitializers = [];
    let _questionIds_decorators;
    let _questionIds_initializers = [];
    let _questionIds_extraInitializers = [];
    return _a = class QuestionDto {
            constructor() {
                this.question = __runInitializers(this, _question_initializers, void 0);
                this.options = (__runInitializers(this, _question_extraInitializers), __runInitializers(this, _options_initializers, void 0));
                this.correctAnswer = (__runInitializers(this, _options_extraInitializers), __runInitializers(this, _correctAnswer_initializers, void 0));
                this.difficultyLevel = (__runInitializers(this, _correctAnswer_extraInitializers), __runInitializers(this, _difficultyLevel_initializers, void 0));
                this.questionIds = (__runInitializers(this, _difficultyLevel_extraInitializers), __runInitializers(this, _questionIds_initializers, void 0));
                __runInitializers(this, _questionIds_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _question_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _options_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsNotEmpty)()];
            _correctAnswer_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _difficultyLevel_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(DifficultyLevel)];
            _questionIds_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ each: true })];
            __esDecorate(null, null, _question_decorators, { kind: "field", name: "question", static: false, private: false, access: { has: obj => "question" in obj, get: obj => obj.question, set: (obj, value) => { obj.question = value; } }, metadata: _metadata }, _question_initializers, _question_extraInitializers);
            __esDecorate(null, null, _options_decorators, { kind: "field", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
            __esDecorate(null, null, _correctAnswer_decorators, { kind: "field", name: "correctAnswer", static: false, private: false, access: { has: obj => "correctAnswer" in obj, get: obj => obj.correctAnswer, set: (obj, value) => { obj.correctAnswer = value; } }, metadata: _metadata }, _correctAnswer_initializers, _correctAnswer_extraInitializers);
            __esDecorate(null, null, _difficultyLevel_decorators, { kind: "field", name: "difficultyLevel", static: false, private: false, access: { has: obj => "difficultyLevel" in obj, get: obj => obj.difficultyLevel, set: (obj, value) => { obj.difficultyLevel = value; } }, metadata: _metadata }, _difficultyLevel_initializers, _difficultyLevel_extraInitializers);
            __esDecorate(null, null, _questionIds_decorators, { kind: "field", name: "questionIds", static: false, private: false, access: { has: obj => "questionIds" in obj, get: obj => obj.questionIds, set: (obj, value) => { obj.questionIds = value; } }, metadata: _metadata }, _questionIds_initializers, _questionIds_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.QuestionDto = QuestionDto;
