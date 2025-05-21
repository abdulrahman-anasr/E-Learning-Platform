"use strict";
/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
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
exports.ModuleController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const roles_decorator_1 = require("src/auth/decorators/roles.decorator");
const authorization_guards_1 = require("src/auth/guards/authorization.guards");
const authentication_guards_1 = require("src/auth/guards/authentication.guards");
var fileNameParameter = "";
let ModuleController = (() => {
    let _classDecorators = [(0, common_1.Controller)('modules')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createModule_decorators;
    let _updateModule_decorators;
    let _checkModuleCompatibility_decorators;
    let _getAllCourseModules_decorators;
    let _uploadFile_decorators;
    let _getFile_decorators;
    var ModuleController = _classThis = class {
        constructor(moduleService, courseModel) {
            this.moduleService = (__runInitializers(this, _instanceExtraInitializers), moduleService);
            this.courseModel = courseModel;
        }
        createModule(req, createModuleDto) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.moduleService.createModule(req, createModuleDto);
            });
        }
        updateModule(id, req, updateModuleDto) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.moduleService.updateModule(id, req, updateModuleDto);
            });
        }
        checkModuleCompatibility(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.moduleService.checkModuleCompatibility(id, 'Above Average');
                //placeholder value , CHANGE ASAP!!
            });
        }
        getAllCourseModules(req, course_id) {
            return __awaiter(this, void 0, void 0, function* () {
                const userid = req.cookies.userid;
                const course = this.courseModel.findById(course_id);
                let enrolled = false;
                (yield course).students.forEach(student => {
                    if (student._id.toString() === userid) {
                        enrolled = true;
                    }
                });
                if (!enrolled) {
                    throw new Error("You are not enrolled in this course");
                }
                return this.moduleService.findAllCourseModules(course_id);
            });
        }
        uploadFile(req, module_id, file) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.moduleService.uploadFile(req, file, module_id, fileNameParameter);
            });
        }
        getFile(module_id, file) {
            return this.moduleService.getFile(file);
        }
    };
    __setFunctionName(_classThis, "ModuleController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createModule_decorators = [(0, roles_decorator_1.Roles)(roles_decorator_1.Role.Instructor), (0, common_1.UseGuards)(authorization_guards_1.authorizationGuard), (0, common_1.Post)()];
        _updateModule_decorators = [(0, roles_decorator_1.Roles)(roles_decorator_1.Role.Instructor), (0, common_1.UseGuards)(authorization_guards_1.authorizationGuard), (0, common_1.Put)(':id')];
        _checkModuleCompatibility_decorators = [(0, common_1.Post)('moduleLevel')];
        _getAllCourseModules_decorators = [(0, common_1.UseGuards)(authentication_guards_1.AuthGuard), (0, common_1.Get)('coursemodules/:id')];
        _uploadFile_decorators = [(0, roles_decorator_1.Roles)(roles_decorator_1.Role.Instructor), (0, common_1.UseGuards)(authorization_guards_1.authorizationGuard), (0, common_1.Post)('upload/:id'), (0, common_2.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads',
                    filename: (req, file, callback) => {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        const ext = (0, path_1.extname)(file.originalname);
                        const fileNameNoExtension = file.originalname.split(".", 2)[0];
                        const filename = `${fileNameNoExtension}.${uniqueSuffix}${ext}`;
                        fileNameParameter = filename;
                        callback(null, filename);
                    },
                }),
            }))];
        _getFile_decorators = [(0, common_1.Get)('download/:id/:file')];
        __esDecorate(_classThis, null, _createModule_decorators, { kind: "method", name: "createModule", static: false, private: false, access: { has: obj => "createModule" in obj, get: obj => obj.createModule }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateModule_decorators, { kind: "method", name: "updateModule", static: false, private: false, access: { has: obj => "updateModule" in obj, get: obj => obj.updateModule }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _checkModuleCompatibility_decorators, { kind: "method", name: "checkModuleCompatibility", static: false, private: false, access: { has: obj => "checkModuleCompatibility" in obj, get: obj => obj.checkModuleCompatibility }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllCourseModules_decorators, { kind: "method", name: "getAllCourseModules", static: false, private: false, access: { has: obj => "getAllCourseModules" in obj, get: obj => obj.getAllCourseModules }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _uploadFile_decorators, { kind: "method", name: "uploadFile", static: false, private: false, access: { has: obj => "uploadFile" in obj, get: obj => obj.uploadFile }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getFile_decorators, { kind: "method", name: "getFile", static: false, private: false, access: { has: obj => "getFile" in obj, get: obj => obj.getFile }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ModuleController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ModuleController = _classThis;
})();
exports.ModuleController = ModuleController;
