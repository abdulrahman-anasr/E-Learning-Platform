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
exports.QuizSchema = exports.Quiz = void 0;
/* eslint-disable prettier/prettier */
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Quiz = (() => {
    let _classDecorators = [(0, mongoose_1.Schema)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _module_id_decorators;
    let _module_id_initializers = [];
    let _module_id_extraInitializers = [];
    let _question_ids_decorators;
    let _question_ids_initializers = [];
    let _question_ids_extraInitializers = [];
    let _questions_decorators;
    let _questions_initializers = [];
    let _questions_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    let _score_decorators;
    let _score_initializers = [];
    let _score_extraInitializers = [];
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    var Quiz = _classThis = class {
        constructor() {
            this.module_id = __runInitializers(this, _module_id_initializers, void 0);
            this.question_ids = (__runInitializers(this, _module_id_extraInitializers), __runInitializers(this, _question_ids_initializers, void 0));
            this.questions = (__runInitializers(this, _question_ids_extraInitializers), __runInitializers(this, _questions_initializers, void 0));
            this.created_at = (__runInitializers(this, _questions_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.score = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _score_initializers, void 0));
            this.userId = (__runInitializers(this, _score_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            __runInitializers(this, _userId_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Quiz");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _module_id_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Module', required: true })];
        _question_ids_decorators = [(0, mongoose_1.Prop)({ type: [mongoose_2.default.Schema.Types.ObjectId], ref: 'QuestionBank', required: true })];
        _questions_decorators = [(0, mongoose_1.Prop)({
                type: [
                    {
                        question: { type: String, required: true },
                        options: { type: [String], required: true },
                    },
                ],
                required: true,
            })];
        _created_at_decorators = [(0, mongoose_1.Prop)({ type: Date, default: new Date(), required: true })];
        _score_decorators = [(0, mongoose_1.Prop)({ type: Number, min: 0 })];
        _userId_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true })];
        __esDecorate(null, null, _module_id_decorators, { kind: "field", name: "module_id", static: false, private: false, access: { has: obj => "module_id" in obj, get: obj => obj.module_id, set: (obj, value) => { obj.module_id = value; } }, metadata: _metadata }, _module_id_initializers, _module_id_extraInitializers);
        __esDecorate(null, null, _question_ids_decorators, { kind: "field", name: "question_ids", static: false, private: false, access: { has: obj => "question_ids" in obj, get: obj => obj.question_ids, set: (obj, value) => { obj.question_ids = value; } }, metadata: _metadata }, _question_ids_initializers, _question_ids_extraInitializers);
        __esDecorate(null, null, _questions_decorators, { kind: "field", name: "questions", static: false, private: false, access: { has: obj => "questions" in obj, get: obj => obj.questions, set: (obj, value) => { obj.questions = value; } }, metadata: _metadata }, _questions_initializers, _questions_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _score_decorators, { kind: "field", name: "score", static: false, private: false, access: { has: obj => "score" in obj, get: obj => obj.score, set: (obj, value) => { obj.score = value; } }, metadata: _metadata }, _score_initializers, _score_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Quiz = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Quiz = _classThis;
})();
exports.Quiz = Quiz;
exports.QuizSchema = mongoose_1.SchemaFactory.createForClass(Quiz);
