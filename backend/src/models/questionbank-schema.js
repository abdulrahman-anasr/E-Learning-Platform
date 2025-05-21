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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionBankSchema = exports.QuestionBank = void 0;
/* eslint-disable prettier/prettier */
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let QuestionBank = (() => {
    let _classDecorators = [(0, mongoose_1.Schema)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _module_id_decorators;
    let _module_id_initializers = [];
    let _module_id_extraInitializers = [];
    let _question_decorators;
    let _question_initializers = [];
    let _question_extraInitializers = [];
    let _options_decorators;
    let _options_initializers = [];
    let _options_extraInitializers = [];
    let _correct_answer_decorators;
    let _correct_answer_initializers = [];
    let _correct_answer_extraInitializers = [];
    let _difficulty_level_decorators;
    let _difficulty_level_initializers = [];
    let _difficulty_level_extraInitializers = [];
    let _explanation_decorators;
    let _explanation_initializers = [];
    let _explanation_extraInitializers = [];
    let _question_type_decorators;
    let _question_type_initializers = [];
    let _question_type_extraInitializers = [];
    var QuestionBank = _classThis = class {
        constructor() {
            this.module_id = __runInitializers(this, _module_id_initializers, void 0);
            this.question = (__runInitializers(this, _module_id_extraInitializers), __runInitializers(this, _question_initializers, void 0));
            this.options = (__runInitializers(this, _question_extraInitializers), __runInitializers(this, _options_initializers, void 0));
            this.correct_answer = (__runInitializers(this, _options_extraInitializers), __runInitializers(this, _correct_answer_initializers, void 0));
            this.difficulty_level = (__runInitializers(this, _correct_answer_extraInitializers), __runInitializers(this, _difficulty_level_initializers, void 0));
            this.explanation = (__runInitializers(this, _difficulty_level_extraInitializers), __runInitializers(this, _explanation_initializers, void 0));
            this.question_type = (__runInitializers(this, _explanation_extraInitializers), __runInitializers(this, _question_type_initializers, void 0));
            __runInitializers(this, _question_type_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "QuestionBank");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _module_id_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Module', required: true })];
        _question_decorators = [(0, mongoose_1.Prop)({ required: true })];
        _options_decorators = [(0, mongoose_1.Prop)({ type: [String], required: true })];
        _correct_answer_decorators = [(0, mongoose_1.Prop)({ required: true })];
        _difficulty_level_decorators = [(0, mongoose_1.Prop)({ enum: ['Easy', 'Medium', 'Hard'], required: true })];
        _explanation_decorators = [(0, mongoose_1.Prop)({ required: false })];
        _question_type_decorators = [(0, mongoose_1.Prop)({ enum: ['MCQ', 'True/False', 'Both'], required: false })];
        __esDecorate(null, null, _module_id_decorators, { kind: "field", name: "module_id", static: false, private: false, access: { has: obj => "module_id" in obj, get: obj => obj.module_id, set: (obj, value) => { obj.module_id = value; } }, metadata: _metadata }, _module_id_initializers, _module_id_extraInitializers);
        __esDecorate(null, null, _question_decorators, { kind: "field", name: "question", static: false, private: false, access: { has: obj => "question" in obj, get: obj => obj.question, set: (obj, value) => { obj.question = value; } }, metadata: _metadata }, _question_initializers, _question_extraInitializers);
        __esDecorate(null, null, _options_decorators, { kind: "field", name: "options", static: false, private: false, access: { has: obj => "options" in obj, get: obj => obj.options, set: (obj, value) => { obj.options = value; } }, metadata: _metadata }, _options_initializers, _options_extraInitializers);
        __esDecorate(null, null, _correct_answer_decorators, { kind: "field", name: "correct_answer", static: false, private: false, access: { has: obj => "correct_answer" in obj, get: obj => obj.correct_answer, set: (obj, value) => { obj.correct_answer = value; } }, metadata: _metadata }, _correct_answer_initializers, _correct_answer_extraInitializers);
        __esDecorate(null, null, _difficulty_level_decorators, { kind: "field", name: "difficulty_level", static: false, private: false, access: { has: obj => "difficulty_level" in obj, get: obj => obj.difficulty_level, set: (obj, value) => { obj.difficulty_level = value; } }, metadata: _metadata }, _difficulty_level_initializers, _difficulty_level_extraInitializers);
        __esDecorate(null, null, _explanation_decorators, { kind: "field", name: "explanation", static: false, private: false, access: { has: obj => "explanation" in obj, get: obj => obj.explanation, set: (obj, value) => { obj.explanation = value; } }, metadata: _metadata }, _explanation_initializers, _explanation_extraInitializers);
        __esDecorate(null, null, _question_type_decorators, { kind: "field", name: "question_type", static: false, private: false, access: { has: obj => "question_type" in obj, get: obj => obj.question_type, set: (obj, value) => { obj.question_type = value; } }, metadata: _metadata }, _question_type_initializers, _question_type_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        QuestionBank = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return QuestionBank = _classThis;
})();
exports.QuestionBank = QuestionBank;
exports.QuestionBankSchema = mongoose_1.SchemaFactory.createForClass(QuestionBank);
