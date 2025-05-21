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
exports.ResponseSchema = exports.Responses = void 0;
/* eslint-disable prettier/prettier */
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Responses = (() => {
    let _classDecorators = [(0, mongoose_1.Schema)({ timestamps: true, strict: false })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _user_id_decorators;
    let _user_id_initializers = [];
    let _user_id_extraInitializers = [];
    let _quiz_id_decorators;
    let _quiz_id_initializers = [];
    let _quiz_id_extraInitializers = [];
    let _answers_decorators;
    let _answers_initializers = [];
    let _answers_extraInitializers = [];
    let _score_decorators;
    let _score_initializers = [];
    let _score_extraInitializers = [];
    let _submittedAt_decorators;
    let _submittedAt_initializers = [];
    let _submittedAt_extraInitializers = [];
    var Responses = _classThis = class {
        constructor() {
            this.user_id = __runInitializers(this, _user_id_initializers, void 0);
            this.quiz_id = (__runInitializers(this, _user_id_extraInitializers), __runInitializers(this, _quiz_id_initializers, void 0));
            this.answers = (__runInitializers(this, _quiz_id_extraInitializers), __runInitializers(this, _answers_initializers, void 0));
            this.score = (__runInitializers(this, _answers_extraInitializers), __runInitializers(this, _score_initializers, void 0));
            this.submittedAt = (__runInitializers(this, _score_extraInitializers), __runInitializers(this, _submittedAt_initializers, void 0));
            __runInitializers(this, _submittedAt_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Responses");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _user_id_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true })];
        _quiz_id_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Quiz', required: true })];
        _answers_decorators = [(0, mongoose_1.Prop)({
                type: [
                    {
                        question_id: { type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Quiz.questions', required: true }, // Reference to the question in the Quiz schema
                        answer: { type: String, required: true }, // User's answer to the question
                    },
                ],
                required: true,
            })];
        _score_decorators = [(0, mongoose_1.Prop)({ type: Number, min: 0 })];
        _submittedAt_decorators = [(0, mongoose_1.Prop)({ type: Date, default: Date.now })];
        __esDecorate(null, null, _user_id_decorators, { kind: "field", name: "user_id", static: false, private: false, access: { has: obj => "user_id" in obj, get: obj => obj.user_id, set: (obj, value) => { obj.user_id = value; } }, metadata: _metadata }, _user_id_initializers, _user_id_extraInitializers);
        __esDecorate(null, null, _quiz_id_decorators, { kind: "field", name: "quiz_id", static: false, private: false, access: { has: obj => "quiz_id" in obj, get: obj => obj.quiz_id, set: (obj, value) => { obj.quiz_id = value; } }, metadata: _metadata }, _quiz_id_initializers, _quiz_id_extraInitializers);
        __esDecorate(null, null, _answers_decorators, { kind: "field", name: "answers", static: false, private: false, access: { has: obj => "answers" in obj, get: obj => obj.answers, set: (obj, value) => { obj.answers = value; } }, metadata: _metadata }, _answers_initializers, _answers_extraInitializers);
        __esDecorate(null, null, _score_decorators, { kind: "field", name: "score", static: false, private: false, access: { has: obj => "score" in obj, get: obj => obj.score, set: (obj, value) => { obj.score = value; } }, metadata: _metadata }, _score_initializers, _score_extraInitializers);
        __esDecorate(null, null, _submittedAt_decorators, { kind: "field", name: "submittedAt", static: false, private: false, access: { has: obj => "submittedAt" in obj, get: obj => obj.submittedAt, set: (obj, value) => { obj.submittedAt = value; } }, metadata: _metadata }, _submittedAt_initializers, _submittedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Responses = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Responses = _classThis;
})();
exports.Responses = Responses;
// Create the schema factory for the Response class
exports.ResponseSchema = mongoose_1.SchemaFactory.createForClass(Responses);
