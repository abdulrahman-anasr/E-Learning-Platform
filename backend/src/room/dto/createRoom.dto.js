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
exports.CreateRoomDto = void 0;
/* eslint-disable prettier/prettier */
const class_validator_1 = require("class-validator");
let CreateRoomDto = (() => {
    var _a;
    let _instructor_decorators;
    let _instructor_initializers = [];
    let _instructor_extraInitializers = [];
    let _students_decorators;
    let _students_initializers = [];
    let _students_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    return _a = class CreateRoomDto {
            constructor() {
                this.instructor = __runInitializers(this, _instructor_initializers, void 0); // Reference to the instructor (User ID)
                this.students = (__runInitializers(this, _instructor_extraInitializers), __runInitializers(this, _students_initializers, void 0)); // List of students (User IDs)
                this.name = (__runInitializers(this, _students_extraInitializers), __runInitializers(this, _name_initializers, void 0)); // Room name
                __runInitializers(this, _name_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _instructor_decorators = [(0, class_validator_1.IsMongoId)()];
            _students_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.ArrayNotEmpty)(), (0, class_validator_1.IsMongoId)({ each: true })];
            _name_decorators = [(0, class_validator_1.IsString)()];
            __esDecorate(null, null, _instructor_decorators, { kind: "field", name: "instructor", static: false, private: false, access: { has: obj => "instructor" in obj, get: obj => obj.instructor, set: (obj, value) => { obj.instructor = value; } }, metadata: _metadata }, _instructor_initializers, _instructor_extraInitializers);
            __esDecorate(null, null, _students_decorators, { kind: "field", name: "students", static: false, private: false, access: { has: obj => "students" in obj, get: obj => obj.students, set: (obj, value) => { obj.students = value; } }, metadata: _metadata }, _students_initializers, _students_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.CreateRoomDto = CreateRoomDto;
