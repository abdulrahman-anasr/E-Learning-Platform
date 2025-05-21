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
exports.createUserDto = void 0;
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
const class_validator_1 = require("class-validator");
let createUserDto = (() => {
    var _a;
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _password_hash_decorators;
    let _password_hash_initializers = [];
    let _password_hash_extraInitializers = [];
    let _role_decorators;
    let _role_initializers = [];
    let _role_extraInitializers = [];
    let _profile_picture_url_decorators;
    let _profile_picture_url_initializers = [];
    let _profile_picture_url_extraInitializers = [];
    return _a = class createUserDto {
            constructor() {
                this.email = __runInitializers(this, _email_initializers, void 0);
                this.name = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.password_hash = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _password_hash_initializers, void 0)); // This will be hashed in the service layer.
                this.role = (__runInitializers(this, _password_hash_extraInitializers), __runInitializers(this, _role_initializers, void 0));
                this.profile_picture_url = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _profile_picture_url_initializers, void 0));
                __runInitializers(this, _profile_picture_url_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _email_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsEmail)({}, { message: 'Please enter a valid email address' })];
            _name_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)()];
            _password_hash_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(6, { message: 'Password must be at least 6 characters long' })];
            _role_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsEnum)(['student', 'instructor', 'admin'])];
            _profile_picture_url_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _password_hash_decorators, { kind: "field", name: "password_hash", static: false, private: false, access: { has: obj => "password_hash" in obj, get: obj => obj.password_hash, set: (obj, value) => { obj.password_hash = value; } }, metadata: _metadata }, _password_hash_initializers, _password_hash_extraInitializers);
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: obj => "role" in obj, get: obj => obj.role, set: (obj, value) => { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            __esDecorate(null, null, _profile_picture_url_decorators, { kind: "field", name: "profile_picture_url", static: false, private: false, access: { has: obj => "profile_picture_url" in obj, get: obj => obj.profile_picture_url, set: (obj, value) => { obj.profile_picture_url = value; } }, metadata: _metadata }, _profile_picture_url_initializers, _profile_picture_url_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.createUserDto = createUserDto;
