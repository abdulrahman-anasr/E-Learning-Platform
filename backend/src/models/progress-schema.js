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
exports.ProgressSchema = exports.Progress = void 0;
/* eslint-disable prettier/prettier */
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Progress = (() => {
    let _classDecorators = [(0, mongoose_1.Schema)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _user_id_decorators;
    let _user_id_initializers = [];
    let _user_id_extraInitializers = [];
    let _course_id_decorators;
    let _course_id_initializers = [];
    let _course_id_extraInitializers = [];
    let _completion_percentage_decorators;
    let _completion_percentage_initializers = [];
    let _completion_percentage_extraInitializers = [];
    let _last_accessed_decorators;
    let _last_accessed_initializers = [];
    let _last_accessed_extraInitializers = [];
    let _attendance_decorators;
    let _attendance_initializers = [];
    let _attendance_extraInitializers = [];
    var Progress = _classThis = class {
        constructor() {
            this.user_id = __runInitializers(this, _user_id_initializers, void 0);
            this.course_id = (__runInitializers(this, _user_id_extraInitializers), __runInitializers(this, _course_id_initializers, void 0));
            this.completion_percentage = (__runInitializers(this, _course_id_extraInitializers), __runInitializers(this, _completion_percentage_initializers, void 0));
            this.last_accessed = (__runInitializers(this, _completion_percentage_extraInitializers), __runInitializers(this, _last_accessed_initializers, void 0));
            this.attendance = (__runInitializers(this, _last_accessed_extraInitializers), __runInitializers(this, _attendance_initializers, void 0));
            __runInitializers(this, _attendance_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Progress");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _user_id_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.String, ref: 'User', required: true })];
        _course_id_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.String, ref: 'Course', required: true })];
        _completion_percentage_decorators = [(0, mongoose_1.Prop)({ type: Number, required: true, min: 0, max: 100 })];
        _last_accessed_decorators = [(0, mongoose_1.Prop)({ type: Date, default: () => new Date(), required: true })];
        _attendance_decorators = [(0, mongoose_1.Prop)({ type: [{ date: { type: Date, required: true }, status: { type: String, enum: ['present', 'absent'], required: true } }] })];
        __esDecorate(null, null, _user_id_decorators, { kind: "field", name: "user_id", static: false, private: false, access: { has: obj => "user_id" in obj, get: obj => obj.user_id, set: (obj, value) => { obj.user_id = value; } }, metadata: _metadata }, _user_id_initializers, _user_id_extraInitializers);
        __esDecorate(null, null, _course_id_decorators, { kind: "field", name: "course_id", static: false, private: false, access: { has: obj => "course_id" in obj, get: obj => obj.course_id, set: (obj, value) => { obj.course_id = value; } }, metadata: _metadata }, _course_id_initializers, _course_id_extraInitializers);
        __esDecorate(null, null, _completion_percentage_decorators, { kind: "field", name: "completion_percentage", static: false, private: false, access: { has: obj => "completion_percentage" in obj, get: obj => obj.completion_percentage, set: (obj, value) => { obj.completion_percentage = value; } }, metadata: _metadata }, _completion_percentage_initializers, _completion_percentage_extraInitializers);
        __esDecorate(null, null, _last_accessed_decorators, { kind: "field", name: "last_accessed", static: false, private: false, access: { has: obj => "last_accessed" in obj, get: obj => obj.last_accessed, set: (obj, value) => { obj.last_accessed = value; } }, metadata: _metadata }, _last_accessed_initializers, _last_accessed_extraInitializers);
        __esDecorate(null, null, _attendance_decorators, { kind: "field", name: "attendance", static: false, private: false, access: { has: obj => "attendance" in obj, get: obj => obj.attendance, set: (obj, value) => { obj.attendance = value; } }, metadata: _metadata }, _attendance_initializers, _attendance_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Progress = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Progress = _classThis;
})();
exports.Progress = Progress;
exports.ProgressSchema = mongoose_1.SchemaFactory.createForClass(Progress);
