"use strict";
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const authentication_guards_1 = require("../auth/guards/authentication.guards");
const authorization_guards_1 = require("src/auth/guards/authorization.guards");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
// @UseGuards(AuthGuard) //class level
let UserController = (() => {
    let _classDecorators = [(0, common_1.Controller)('users')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getAllStudents_decorators;
    let _getUserByEmail_decorators;
    let _getUserById_decorators;
    let _getInstructors_decorators;
    let _getStudentsByInstructors_decorators;
    let _updateUserProfile_decorators;
    let _deleteUser_decorators;
    let _getCompletedCourses_decorators;
    let _getCourses_decorators;
    let _logout_decorators;
    var UserController = _classThis = class {
        constructor(userService, progressService, jwtService) {
            this.userService = (__runInitializers(this, _instanceExtraInitializers), userService);
            this.progressService = progressService;
            this.jwtService = jwtService;
        }
        getAllStudents() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.userService.findAll();
            });
        }
        getUserByEmail(email) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!email) {
                    throw new common_1.BadRequestException('Email is required');
                }
                return this.userService.findByEmail(email);
            });
        }
        getUserById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield this.userService.findById(id);
                return user;
            });
        }
        getInstructors() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.userService.findAllInstructors();
            });
        }
        getStudentsByInstructors(instructorId) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.userService.findStudentsByInstructor(instructorId);
            });
        }
        // Update a student's details
        updateUserProfile(req, updateData) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('Entered function');
                console.log('Cookies in request:', req.cookies);
                const userId = req.cookies.userId;
                const updatedUser = yield this.userService.update(userId, updateData);
                console.log('Updated user data:', updatedUser);
                return updatedUser;
            });
        }
        catch(error) {
            console.error('Token verification failed:', error);
            throw new common_1.UnauthorizedException('Invalid token');
        }
        // Delete a student by ID
        deleteUser(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const deletedUser = yield this.userService.delete(id);
                return deletedUser;
            });
        }
        getCompletedCourses(req) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.progressService.getCompletedCourses(req.cookies.userId);
            });
        }
        getCourses(req) {
            return __awaiter(this, void 0, void 0, function* () {
                const userid = req.cookies.userId;
                if (!userid) {
                    throw new common_1.UnauthorizedException('No token provided');
                }
                try {
                    const user = this.userService.findById(userid);
                    return (yield user).courses;
                }
                catch (error) {
                    console.error('Token verification failed:', error);
                    throw new common_1.UnauthorizedException('Invalid token');
                }
            });
        }
        logout(res) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.userService.logout(res);
            });
        }
    };
    __setFunctionName(_classThis, "UserController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getAllStudents_decorators = [(0, common_1.Get)('/all'), (0, roles_decorator_1.Roles)(roles_decorator_1.Role.Instructor, roles_decorator_1.Role.Admin), (0, common_1.UseGuards)(authorization_guards_1.authorizationGuard)];
        _getUserByEmail_decorators = [(0, roles_decorator_1.Roles)(roles_decorator_1.Role.Instructor, roles_decorator_1.Role.Admin), (0, common_1.UseGuards)(authorization_guards_1.authorizationGuard), (0, common_1.Get)('by-email')];
        _getUserById_decorators = [(0, roles_decorator_1.Roles)(roles_decorator_1.Role.Instructor, roles_decorator_1.Role.Admin), (0, common_1.UseGuards)(authorization_guards_1.authorizationGuard), (0, common_1.Get)('fetch/:id')];
        _getInstructors_decorators = [(0, roles_decorator_1.Roles)(roles_decorator_1.Role.Admin), (0, common_1.UseGuards)(authorization_guards_1.authorizationGuard), (0, common_1.Get)('instructors')];
        _getStudentsByInstructors_decorators = [(0, roles_decorator_1.Roles)(roles_decorator_1.Role.Admin, roles_decorator_1.Role.Instructor), (0, common_1.UseGuards)(authorization_guards_1.authorizationGuard), (0, common_1.Get)('instructorstudents')];
        _updateUserProfile_decorators = [(0, common_1.Put)('me'), (0, common_1.UseGuards)(authentication_guards_1.AuthGuard)];
        _deleteUser_decorators = [(0, common_1.Delete)('delete/:id'), (0, roles_decorator_1.Roles)(roles_decorator_1.Role.Admin), (0, common_1.UseGuards)(authorization_guards_1.authorizationGuard)];
        _getCompletedCourses_decorators = [(0, common_1.Get)('completed/:userId'), (0, roles_decorator_1.Roles)(roles_decorator_1.Role.Student), (0, common_1.UseGuards)(authorization_guards_1.authorizationGuard)];
        _getCourses_decorators = [(0, common_1.Get)('courses'), (0, common_1.UseGuards)(authentication_guards_1.AuthGuard)];
        _logout_decorators = [(0, common_1.Post)('logout')];
        __esDecorate(_classThis, null, _getAllStudents_decorators, { kind: "method", name: "getAllStudents", static: false, private: false, access: { has: obj => "getAllStudents" in obj, get: obj => obj.getAllStudents }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserByEmail_decorators, { kind: "method", name: "getUserByEmail", static: false, private: false, access: { has: obj => "getUserByEmail" in obj, get: obj => obj.getUserByEmail }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserById_decorators, { kind: "method", name: "getUserById", static: false, private: false, access: { has: obj => "getUserById" in obj, get: obj => obj.getUserById }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getInstructors_decorators, { kind: "method", name: "getInstructors", static: false, private: false, access: { has: obj => "getInstructors" in obj, get: obj => obj.getInstructors }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getStudentsByInstructors_decorators, { kind: "method", name: "getStudentsByInstructors", static: false, private: false, access: { has: obj => "getStudentsByInstructors" in obj, get: obj => obj.getStudentsByInstructors }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateUserProfile_decorators, { kind: "method", name: "updateUserProfile", static: false, private: false, access: { has: obj => "updateUserProfile" in obj, get: obj => obj.updateUserProfile }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteUser_decorators, { kind: "method", name: "deleteUser", static: false, private: false, access: { has: obj => "deleteUser" in obj, get: obj => obj.deleteUser }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCompletedCourses_decorators, { kind: "method", name: "getCompletedCourses", static: false, private: false, access: { has: obj => "getCompletedCourses" in obj, get: obj => obj.getCompletedCourses }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCourses_decorators, { kind: "method", name: "getCourses", static: false, private: false, access: { has: obj => "getCourses" in obj, get: obj => obj.getCourses }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _logout_decorators, { kind: "method", name: "logout", static: false, private: false, access: { has: obj => "logout" in obj, get: obj => obj.logout }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserController = _classThis;
})();
exports.UserController = UserController;
