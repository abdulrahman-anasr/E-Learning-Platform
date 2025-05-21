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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadSchema = exports.Thread = void 0;
/* eslint-disable prettier/prettier */
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Thread = (() => {
    let _classDecorators = [(0, mongoose_1.Schema)({ timestamps: true })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _threadTitle_decorators;
    let _threadTitle_initializers = [];
    let _threadTitle_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _forum_id_decorators;
    let _forum_id_initializers = [];
    let _forum_id_extraInitializers = [];
    let _createdBy_decorators;
    let _createdBy_initializers = [];
    let _createdBy_extraInitializers = [];
    var Thread = _classThis = class {
        constructor() {
            this.threadTitle = __runInitializers(this, _threadTitle_initializers, void 0); // Title of the thread (the main subject of the thread)
            this.content = (__runInitializers(this, _threadTitle_extraInitializers), __runInitializers(this, _content_initializers, void 0)); // Content of the thread
            this.forum_id = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _forum_id_initializers, void 0));
            this.createdBy = (__runInitializers(this, _forum_id_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0)); // Reference to the user who created the thread
            __runInitializers(this, _createdBy_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Thread");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _threadTitle_decorators = [(0, mongoose_1.Prop)({ required: true })];
        _content_decorators = [(0, mongoose_1.Prop)({ required: true })];
        _forum_id_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Forum', required: true })];
        _createdBy_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true })];
        __esDecorate(null, null, _threadTitle_decorators, { kind: "field", name: "threadTitle", static: false, private: false, access: { has: obj => "threadTitle" in obj, get: obj => obj.threadTitle, set: (obj, value) => { obj.threadTitle = value; } }, metadata: _metadata }, _threadTitle_initializers, _threadTitle_extraInitializers);
        __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
        __esDecorate(null, null, _forum_id_decorators, { kind: "field", name: "forum_id", static: false, private: false, access: { has: obj => "forum_id" in obj, get: obj => obj.forum_id, set: (obj, value) => { obj.forum_id = value; } }, metadata: _metadata }, _forum_id_initializers, _forum_id_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: obj => "createdBy" in obj, get: obj => obj.createdBy, set: (obj, value) => { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Thread = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Thread = _classThis;
})();
exports.Thread = Thread;
exports.ThreadSchema = mongoose_1.SchemaFactory.createForClass(Thread);
exports.ThreadSchema.index({ content: 'text' });
