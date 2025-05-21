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
exports.CreateForumDto = void 0;
/* eslint-disable prettier/prettier */
const class_validator_1 = require("class-validator");
let CreateForumDto = (() => {
    var _a;
    let _course_id_decorators;
    let _course_id_initializers = [];
    let _course_id_extraInitializers = [];
    let _forumTitle_decorators;
    let _forumTitle_initializers = [];
    let _forumTitle_extraInitializers = [];
    let _createdBy_decorators;
    let _createdBy_initializers = [];
    let _createdBy_extraInitializers = [];
    let _threads_decorators;
    let _threads_initializers = [];
    let _threads_extraInitializers = [];
    let _active_decorators;
    let _active_initializers = [];
    let _active_extraInitializers = [];
    return _a = class CreateForumDto {
            constructor() {
                this.course_id = __runInitializers(this, _course_id_initializers, void 0); // Reference to the associated course (use ObjectId)
                this.forumTitle = (__runInitializers(this, _course_id_extraInitializers), __runInitializers(this, _forumTitle_initializers, void 0)); // Title of the forum
                this.createdBy = (__runInitializers(this, _forumTitle_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0)); // Reference to the user who created the forum (use ObjectId)
                this.threads = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _threads_initializers, void 0)); // Array of thread references (use ObjectIds for the threads in the forum)
                this.active = (__runInitializers(this, _threads_extraInitializers), __runInitializers(this, _active_initializers, void 0));
                __runInitializers(this, _active_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _course_id_decorators = [(0, class_validator_1.IsMongoId)(), (0, class_validator_1.IsNotEmpty)()];
            _forumTitle_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _createdBy_decorators = [(0, class_validator_1.IsMongoId)(), (0, class_validator_1.IsNotEmpty)()];
            _threads_decorators = [(0, class_validator_1.IsArray)()];
            _active_decorators = [(0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _course_id_decorators, { kind: "field", name: "course_id", static: false, private: false, access: { has: obj => "course_id" in obj, get: obj => obj.course_id, set: (obj, value) => { obj.course_id = value; } }, metadata: _metadata }, _course_id_initializers, _course_id_extraInitializers);
            __esDecorate(null, null, _forumTitle_decorators, { kind: "field", name: "forumTitle", static: false, private: false, access: { has: obj => "forumTitle" in obj, get: obj => obj.forumTitle, set: (obj, value) => { obj.forumTitle = value; } }, metadata: _metadata }, _forumTitle_initializers, _forumTitle_extraInitializers);
            __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: obj => "createdBy" in obj, get: obj => obj.createdBy, set: (obj, value) => { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
            __esDecorate(null, null, _threads_decorators, { kind: "field", name: "threads", static: false, private: false, access: { has: obj => "threads" in obj, get: obj => obj.threads, set: (obj, value) => { obj.threads = value; } }, metadata: _metadata }, _threads_initializers, _threads_extraInitializers);
            __esDecorate(null, null, _active_decorators, { kind: "field", name: "active", static: false, private: false, access: { has: obj => "active" in obj, get: obj => obj.active, set: (obj, value) => { obj.active = value; } }, metadata: _metadata }, _active_initializers, _active_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.CreateForumDto = CreateForumDto;
