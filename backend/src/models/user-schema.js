"use strict";
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const notification_schema_1 = require("./notification-schema");
let User = (() => {
    let _classDecorators = [(0, mongoose_1.Schema)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _password_hash_decorators;
    let _password_hash_initializers = [];
    let _password_hash_extraInitializers = [];
    let _role_decorators;
    let _role_initializers = [];
    let _role_extraInitializers = [];
    let _profile_picture_url_decorators;
    let _profile_picture_url_initializers = [];
    let _profile_picture_url_extraInitializers = [];
    let _created_at_decorators;
    let _created_at_initializers = [];
    let _created_at_extraInitializers = [];
    let _courses_decorators;
    let _courses_initializers = [];
    let _courses_extraInitializers = [];
    let _notifications_decorators;
    let _notifications_initializers = [];
    let _notifications_extraInitializers = [];
    let _refresh_token_decorators;
    let _refresh_token_initializers = [];
    let _refresh_token_extraInitializers = [];
    var User = _classThis = class {
        constructor() {
            this.name = __runInitializers(this, _name_initializers, void 0);
            this.email = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.password_hash = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _password_hash_initializers, void 0));
            this.role = (__runInitializers(this, _password_hash_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.profile_picture_url = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _profile_picture_url_initializers, void 0));
            this.created_at = (__runInitializers(this, _profile_picture_url_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
            this.courses = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _courses_initializers, void 0));
            this.notifications = (__runInitializers(this, _courses_extraInitializers), __runInitializers(this, _notifications_initializers, void 0));
            // Array of notifications for the user
            this.refresh_token = (__runInitializers(this, _notifications_extraInitializers), __runInitializers(this, _refresh_token_initializers, void 0)); // Refresh token for the user
            __runInitializers(this, _refresh_token_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "User");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, mongoose_1.Prop)({ type: String, required: true, minLength: 3, maxLength: 50 })];
        _email_decorators = [(0, mongoose_1.Prop)({ type: String,
                minLength: 10,
                maxLength: 50,
                required: true })];
        _password_hash_decorators = [(0, mongoose_1.Prop)({ type: String,
                minLength: 5 })];
        _role_decorators = [(0, mongoose_1.Prop)({ type: String,
                enum: ['student', 'instructor', 'admin'],
                required: true })];
        _profile_picture_url_decorators = [(0, mongoose_1.Prop)({ type: String,
                minLength: 10, required: false })];
        _created_at_decorators = [(0, mongoose_1.Prop)({ type: Date,
                default: Date.now,
                required: true })];
        _courses_decorators = [(0, mongoose_1.Prop)({ type: [mongoose_2.default.Schema.Types.ObjectId], ref: 'Course' })];
        _notifications_decorators = [(0, mongoose_1.Prop)({ type: [notification_schema_1.NotificationSchema], default: [] })];
        _refresh_token_decorators = [(0, mongoose_1.Prop)({ type: String, required: false })];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _password_hash_decorators, { kind: "field", name: "password_hash", static: false, private: false, access: { has: obj => "password_hash" in obj, get: obj => obj.password_hash, set: (obj, value) => { obj.password_hash = value; } }, metadata: _metadata }, _password_hash_initializers, _password_hash_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: obj => "role" in obj, get: obj => obj.role, set: (obj, value) => { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _profile_picture_url_decorators, { kind: "field", name: "profile_picture_url", static: false, private: false, access: { has: obj => "profile_picture_url" in obj, get: obj => obj.profile_picture_url, set: (obj, value) => { obj.profile_picture_url = value; } }, metadata: _metadata }, _profile_picture_url_initializers, _profile_picture_url_extraInitializers);
        __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: obj => "created_at" in obj, get: obj => obj.created_at, set: (obj, value) => { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
        __esDecorate(null, null, _courses_decorators, { kind: "field", name: "courses", static: false, private: false, access: { has: obj => "courses" in obj, get: obj => obj.courses, set: (obj, value) => { obj.courses = value; } }, metadata: _metadata }, _courses_initializers, _courses_extraInitializers);
        __esDecorate(null, null, _notifications_decorators, { kind: "field", name: "notifications", static: false, private: false, access: { has: obj => "notifications" in obj, get: obj => obj.notifications, set: (obj, value) => { obj.notifications = value; } }, metadata: _metadata }, _notifications_initializers, _notifications_extraInitializers);
        __esDecorate(null, null, _refresh_token_decorators, { kind: "field", name: "refresh_token", static: false, private: false, access: { has: obj => "refresh_token" in obj, get: obj => obj.refresh_token, set: (obj, value) => { obj.refresh_token = value; } }, metadata: _metadata }, _refresh_token_initializers, _refresh_token_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
})();
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
