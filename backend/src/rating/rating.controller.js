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
exports.RatingController = void 0;
/* eslint-disable prettier/prettier */
const common_1 = require("@nestjs/common");
let RatingController = (() => {
    let _classDecorators = [(0, common_1.Controller)('ratings')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createRating_decorators;
    let _updateRating_decorators;
    let _findAll_decorators;
    let _findOne_decorators;
    let _getCourseRating_decorators;
    let _getInstructorRating_decorators;
    let _getModuleRating_decorators;
    let _delete_decorators;
    var RatingController = _classThis = class {
        constructor(ratingService) {
            this.ratingService = (__runInitializers(this, _instanceExtraInitializers), ratingService);
        }
        createRating(createRatingDto) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.ratingService.createRating(createRatingDto);
            });
        }
        updateRating(id, updateRatingDto) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.ratingService.updateRating(id, updateRatingDto);
            });
        }
        findAll() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.ratingService.findAll();
            });
        }
        findOne(id) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield this.ratingService.findOne(id);
                }
                catch (error) {
                    throw new common_1.NotFoundException(error.message);
                }
            });
        }
        getCourseRating(courseId) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.ratingService.getCourseRating(courseId);
            });
        }
        getInstructorRating(instructorId) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.ratingService.getInstructorRating(instructorId);
            });
        }
        getModuleRating(moduleId) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.ratingService.getModuleRating(moduleId);
            });
        }
        delete(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.ratingService.delete(id);
            });
        }
    };
    __setFunctionName(_classThis, "RatingController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createRating_decorators = [(0, common_1.Post)('createrating')];
        _updateRating_decorators = [(0, common_1.Put)(':id')];
        _findAll_decorators = [(0, common_1.Get)()];
        _findOne_decorators = [(0, common_1.Get)(':id')];
        _getCourseRating_decorators = [(0, common_1.Get)('course-rating/:courseId')];
        _getInstructorRating_decorators = [(0, common_1.Get)('instructor-rating/:instructorId')];
        _getModuleRating_decorators = [(0, common_1.Get)('module-rating/:moduleId')];
        _delete_decorators = [(0, common_1.Delete)(':id')];
        __esDecorate(_classThis, null, _createRating_decorators, { kind: "method", name: "createRating", static: false, private: false, access: { has: obj => "createRating" in obj, get: obj => obj.createRating }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateRating_decorators, { kind: "method", name: "updateRating", static: false, private: false, access: { has: obj => "updateRating" in obj, get: obj => obj.updateRating }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCourseRating_decorators, { kind: "method", name: "getCourseRating", static: false, private: false, access: { has: obj => "getCourseRating" in obj, get: obj => obj.getCourseRating }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getInstructorRating_decorators, { kind: "method", name: "getInstructorRating", static: false, private: false, access: { has: obj => "getInstructorRating" in obj, get: obj => obj.getInstructorRating }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getModuleRating_decorators, { kind: "method", name: "getModuleRating", static: false, private: false, access: { has: obj => "getModuleRating" in obj, get: obj => obj.getModuleRating }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RatingController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RatingController = _classThis;
})();
exports.RatingController = RatingController;
