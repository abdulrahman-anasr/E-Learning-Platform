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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleService = exports.FileSizeValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const common_2 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const mongoose_2 = __importDefault(require("mongoose"));
let FileSizeValidationPipe = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var FileSizeValidationPipe = _classThis = class {
        transform(value, metadata) {
            // "value" is an object containing the file's attributes and metadata
            const oneKb = 1000;
            return value.size < oneKb;
        }
    };
    __setFunctionName(_classThis, "FileSizeValidationPipe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FileSizeValidationPipe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FileSizeValidationPipe = _classThis;
})();
exports.FileSizeValidationPipe = FileSizeValidationPipe;
let ModuleService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ModuleService = _classThis = class {
        constructor(moduleModel, courseModel) {
            this.moduleModel = moduleModel;
            this.courseModel = courseModel;
        }
        getModule(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const module = yield this.moduleModel.findById(new mongoose_2.default.Types.ObjectId(id)).exec();
                return module;
            });
        }
        createModule(req, createModuleDto) {
            return __awaiter(this, void 0, void 0, function* () {
                const userid = req.cookies.userid;
                const course = this.courseModel.findById(createModuleDto.course_id);
                if (userid != (yield course).created_by) {
                    throw new common_1.UnauthorizedException("You are not authorized to create a module");
                }
                const createdModule = new this.moduleModel(createModuleDto);
                createdModule.save();
                return "Module created and added";
            });
        }
        updateModule(id, req, updateModuleDto) {
            return __awaiter(this, void 0, void 0, function* () {
                const userid = req.cookies.userid;
                const usedModule = this.moduleModel.findById(new mongoose_1.Types.ObjectId(id));
                const courseid = (yield usedModule).course_id;
                const course = this.courseModel.findById(courseid);
                if (userid != (yield course).created_by) {
                    throw new common_1.UnauthorizedException("You are not authorized to update this module");
                }
                const module = yield this.moduleModel.findById(new mongoose_2.default.Types.ObjectId(id)).exec();
                if (module) {
                    Object.assign(module, updateModuleDto); // Update Course
                    return module.save();
                }
                return null;
            });
        }
        findAllCourseModules(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield this.moduleModel.find({ "course_id": id });
                return result;
            });
        }
        checkModuleCompatibility(moduleId, performanceMetric) {
            return __awaiter(this, void 0, void 0, function* () {
                var performanceLevel;
                if (performanceMetric === 'Above Average') {
                    performanceLevel = 'Hard';
                }
                else if (performanceMetric === 'Average') {
                    performanceLevel = 'Medium';
                }
                else {
                    performanceLevel = 'East';
                }
                var moduleDifficulty = (yield this.moduleModel.findById(moduleId).exec()).difficulty;
                switch (performanceLevel) {
                    case 'Hard':
                        return true;
                        break;
                    case 'Medium':
                        if (moduleDifficulty === 'Hard') {
                            return false;
                        }
                        else {
                            return true;
                        }
                        break;
                    case 'Easy':
                        if (moduleDifficulty === 'Easy') {
                            return true;
                        }
                        else {
                            return false;
                        }
                }
                return false;
            });
        }
        uploadFile(req, file, moduleId, fileName) {
            return __awaiter(this, void 0, void 0, function* () {
                const userid = req.cookies.userid;
                const usedModule = this.moduleModel.findById(new mongoose_1.Types.ObjectId(moduleId));
                const courseid = (yield usedModule).course_id;
                const course = this.courseModel.findById(courseid);
                if (userid != (yield course).created_by) {
                    throw new common_1.UnauthorizedException("You are not authorized to update this module");
                }
                var currentModule = yield this.moduleModel.findById(new mongoose_2.default.Types.ObjectId(moduleId)).exec();
                console.log('Current Module title is: ' + currentModule.title);
                currentModule.resources.push(fileName);
                currentModule.save();
                console.log('file is: ' + file);
                return 'File upload API';
            });
        }
        getFile(fileUrl) {
            const fileRelativeUrl = 'uploads/' + fileUrl;
            const file = (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), fileRelativeUrl));
            return new common_2.StreamableFile(file, {
                type: 'application/octet-stream',
                disposition: 'attachment; filename="' + fileUrl + '"',
            });
        }
    };
    __setFunctionName(_classThis, "ModuleService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ModuleService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ModuleService = _classThis;
})();
exports.ModuleService = ModuleService;
