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
exports.ModuleSchema = exports.Module = void 0;
/* eslint-disable prettier/prettier */
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Module = (() => {
    let _classDecorators = [(0, mongoose_1.Schema)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _course_id_decorators;
    let _course_id_initializers = [];
    let _course_id_extraInitializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _title_extraInitializers = [];
    let _difficulty_decorators;
    let _difficulty_initializers = [];
    let _difficulty_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _valid_content_decorators;
    let _valid_content_initializers = [];
    let _valid_content_extraInitializers = [];
    let _resources_decorators;
    let _resources_initializers = [];
    let _resources_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    var Module = _classThis = class {
        constructor() {
            this.course_id = __runInitializers(this, _course_id_initializers, void 0);
            this.title = (__runInitializers(this, _course_id_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.difficulty = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _difficulty_initializers, void 0));
            this.content = (__runInitializers(this, _difficulty_extraInitializers), __runInitializers(this, _content_initializers, void 0));
            this.valid_content = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _valid_content_initializers, void 0));
            this.resources = (__runInitializers(this, _valid_content_extraInitializers), __runInitializers(this, _resources_initializers, void 0));
            this.created_at = (__runInitializers(this, _resources_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            __runInitializers(this, _created_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Module");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _course_id_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Course', required: true })];
        _title_decorators = [(0, mongoose_1.Prop)({ type: String, required: true, minlength: 1, maxlength: 100 })];
        _difficulty_decorators = [(0, mongoose_1.Prop)({ type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] })];
        _content_decorators = [(0, mongoose_1.Prop)({ type: String, required: true, minlength: 1, maxlength: 5000 })];
        _valid_content_decorators = [(0, mongoose_1.Prop)({ type: Boolean, required: true, default: true })];
        _resources_decorators = [(0, mongoose_1.Prop)({ type: [String], required: false })];
        _created_at_decorators = [(0, mongoose_1.Prop)({ type: Date, default: () => new Date() })];
        __esDecorate(null, null, _course_id_decorators, { kind: "field", name: "course_id", static: false, private: false, access: { has: obj => "course_id" in obj, get: obj => obj.course_id, set: (obj, value) => { obj.course_id = value; } }, metadata: _metadata }, _course_id_initializers, _course_id_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _difficulty_decorators, { kind: "field", name: "difficulty", static: false, private: false, access: { has: obj => "difficulty" in obj, get: obj => obj.difficulty, set: (obj, value) => { obj.difficulty = value; } }, metadata: _metadata }, _difficulty_initializers, _difficulty_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _valid_content_decorators, { kind: "field", name: "valid_content", static: false, private: false, access: { has: obj => "valid_content" in obj, get: obj => obj.valid_content, set: (obj, value) => { obj.valid_content = value; } }, metadata: _metadata }, _valid_content_initializers, _valid_content_extraInitializers);
        __esDecorate(null, null, _resources_decorators, { kind: "field", name: "resources", static: false, private: false, access: { has: obj => "resources" in obj, get: obj => obj.resources, set: (obj, value) => { obj.resources = value; } }, metadata: _metadata }, _resources_initializers, _resources_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Module = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Module = _classThis;
})();
exports.Module = Module;
exports.ModuleSchema = mongoose_1.SchemaFactory.createForClass(Module);
