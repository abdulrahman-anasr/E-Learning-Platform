"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
/* eslint-disable prettier/prettier */
// SWE-PROJ/backend/src/course/course.controller.ts
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("src/auth/decorators/roles.decorator");
const authorization_guards_1 = require("src/auth/guards/authorization.guards");
const authentication_guards_1 = require("src/auth/guards/authentication.guards");
let CourseController = (() => {
    let _classDecorators = [(0, common_1.Controller)('courses')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findAll_decorators;
    let _delete_decorators;
    let _search_decorators;
    let _findOne_decorators;
    let _update_decorators;
    let _enroll_decorators;
    var CourseController = _classThis = class {
        constructor(courseService) {
            this.courseService = (__runInitializers(this, _instanceExtraInitializers), courseService);
        }
        create(req, createCourseDto) {
            console.log('Creating course:', createCourseDto);
            return this.courseService.create(createCourseDto, req);
        }
        findAll() {
            return this.courseService.findAll();
        }
        delete(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.courseService.delete(id);
            });
        }
        search(query) {
            console.log('Search Query: ', query);
            return this.courseService.search(query);
        }
        findOne(id) {
            return this.courseService.findOne(id);
        }
        update(id, updateCourseDto) {
            return this.courseService.update(id, updateCourseDto);
        }
        enroll(id, req) {
            this.courseService.enroll(id, req);
        }
    };
    __setFunctionName(_classThis, "CourseController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, roles_decorator_1.Roles)(roles_decorator_1.Role.Admin, roles_decorator_1.Role.Instructor), (0, common_1.UseGuards)(authorization_guards_1.authorizationGuard), (0, common_1.Post)('create')];
        _findAll_decorators = [(0, common_1.Get)()];
        _delete_decorators = [(0, roles_decorator_1.Roles)(roles_decorator_1.Role.Admin, roles_decorator_1.Role.Instructor), (0, common_1.UseGuards)(authorization_guards_1.authorizationGuard), (0, common_1.Delete)(':id')];
        _search_decorators = [(0, common_1.Get)('search')];
        _findOne_decorators = [(0, common_1.Get)(':id')];
        _update_decorators = [(0, roles_decorator_1.Roles)(roles_decorator_1.Role.Admin, roles_decorator_1.Role.Instructor), (0, common_1.UseGuards)(authorization_guards_1.authorizationGuard), (0, common_1.Put)(':id')];
        _enroll_decorators = [(0, common_1.UseGuards)(authentication_guards_1.AuthGuard), (0, common_1.Put)('enroll/:id')];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _search_decorators, { kind: "method", name: "search", static: false, private: false, access: { has: obj => "search" in obj, get: obj => obj.search }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _enroll_decorators, { kind: "method", name: "enroll", static: false, private: false, access: { has: obj => "enroll" in obj, get: obj => obj.enroll }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CourseController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CourseController = _classThis;
})();
exports.CourseController = CourseController;
