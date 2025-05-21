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
exports.RatingSchema = exports.Rating = void 0;
/* eslint-disable prettier/prettier */
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let Rating = (() => {
    let _classDecorators = [(0, mongoose_1.Schema)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _rating_decorators;
    let _rating_initializers = [];
    let _rating_extraInitializers = [];
    let _ratedEntity_decorators;
    let _ratedEntity_initializers = [];
    let _ratedEntity_extraInitializers = [];
    let _ratedEntityId_decorators;
    let _ratedEntityId_initializers = [];
    let _ratedEntityId_extraInitializers = [];
    let _user_id_decorators;
    let _user_id_initializers = [];
    let _user_id_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    var Rating = _classThis = class {
        constructor() {
            this.rating = __runInitializers(this, _rating_initializers, void 0);
            this.ratedEntity = (__runInitializers(this, _rating_extraInitializers), __runInitializers(this, _ratedEntity_initializers, void 0));
            this.ratedEntityId = (__runInitializers(this, _ratedEntity_extraInitializers), __runInitializers(this, _ratedEntityId_initializers, void 0));
            this.user_id = (__runInitializers(this, _ratedEntityId_extraInitializers), __runInitializers(this, _user_id_initializers, void 0));
            this.created_at = (__runInitializers(this, _user_id_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            __runInitializers(this, _created_at_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Rating");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _rating_decorators = [(0, mongoose_1.Prop)({ required: true, min: 1, max: 5 })];
        _ratedEntity_decorators = [(0, mongoose_1.Prop)({ type: String, required: true, enum: ['Module', 'Course', 'Instructor'] })];
        _ratedEntityId_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, refPath: 'ratedEntity', required: false })];
        _user_id_decorators = [(0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true })];
        _created_at_decorators = [(0, mongoose_1.Prop)({ default: Date.now })];
        __esDecorate(null, null, _rating_decorators, { kind: "field", name: "rating", static: false, private: false, access: { has: obj => "rating" in obj, get: obj => obj.rating, set: (obj, value) => { obj.rating = value; } }, metadata: _metadata }, _rating_initializers, _rating_extraInitializers);
        __esDecorate(null, null, _ratedEntity_decorators, { kind: "field", name: "ratedEntity", static: false, private: false, access: { has: obj => "ratedEntity" in obj, get: obj => obj.ratedEntity, set: (obj, value) => { obj.ratedEntity = value; } }, metadata: _metadata }, _ratedEntity_initializers, _ratedEntity_extraInitializers);
        __esDecorate(null, null, _ratedEntityId_decorators, { kind: "field", name: "ratedEntityId", static: false, private: false, access: { has: obj => "ratedEntityId" in obj, get: obj => obj.ratedEntityId, set: (obj, value) => { obj.ratedEntityId = value; } }, metadata: _metadata }, _ratedEntityId_initializers, _ratedEntityId_extraInitializers);
        __esDecorate(null, null, _user_id_decorators, { kind: "field", name: "user_id", static: false, private: false, access: { has: obj => "user_id" in obj, get: obj => obj.user_id, set: (obj, value) => { obj.user_id = value; } }, metadata: _metadata }, _user_id_initializers, _user_id_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Rating = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Rating = _classThis;
})();
exports.Rating = Rating;
exports.RatingSchema = mongoose_1.SchemaFactory.createForClass(Rating);
