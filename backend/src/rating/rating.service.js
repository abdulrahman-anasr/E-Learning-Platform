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
exports.RatingService = void 0;
/* eslint-disable prettier/prettier */
const common_1 = require("@nestjs/common");
const mongoose_1 = __importDefault(require("mongoose"));
let RatingService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RatingService = _classThis = class {
        constructor(ratingModel) {
            this.ratingModel = ratingModel;
        }
        createRating(createRatingDto) {
            return __awaiter(this, void 0, void 0, function* () {
                const newRating = new this.ratingModel(createRatingDto);
                return yield newRating.save();
            });
        }
        updateRating(id, updateRatingDto) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.ratingModel.findByIdAndUpdate(id, updateRatingDto, { new: true });
            });
        }
        findAll() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.ratingModel.find().exec();
            });
        }
        findOne(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const rating = yield this.ratingModel.findOne({ _id: id }).exec();
                if (!rating) {
                    throw new common_1.NotFoundException(`Rating record with ID ${id} not found`);
                }
                return rating;
            });
        }
        getCourseRating(courseId) {
            return __awaiter(this, void 0, void 0, function* () {
                const ratings = yield this.ratingModel
                    .aggregate([
                    // Check that the ratedEntityId (id of course) matches the courseId.
                    { $match: { ratedEntity: 'Course', ratedEntityId: new mongoose_1.default.Types.ObjectId(courseId) } },
                    // group documents that match together to calculate average rating for all
                    { $group: { _id: '$ratedEntityId', averageRating: { $avg: '$rating' } } },
                ]);
                // Check if ratings are larger than 0 meaning there are ratings for this course, if so it will take the 
                //first element (the one that contains the average) will be returned
                return ratings.length > 0 ? ratings[0].averageRating : 0;
            });
        }
        getInstructorRating(instructorId) {
            return __awaiter(this, void 0, void 0, function* () {
                const ratings = yield this.ratingModel
                    .aggregate([
                    { $match: { ratedEntity: 'Instructor', ratedEntityId: new mongoose_1.default.Types.ObjectId(instructorId) } },
                    { $group: { _id: '$ratedEntityId', averageRating: { $avg: '$rating' } } },
                ]);
                return ratings.length > 0 ? ratings[0].averageRating : 0;
            });
        }
        getModuleRating(moduleId) {
            return __awaiter(this, void 0, void 0, function* () {
                const ratings = yield this.ratingModel
                    .aggregate([
                    { $match: { ratedEntity: 'Module', ratedEntityId: new mongoose_1.default.Types.ObjectId(moduleId) } },
                    { $group: { _id: '$ratedEntityId', averageRating: { $avg: '$rating' } } },
                ]);
                return ratings.length > 0 ? ratings[0].averageRating : 0;
            });
        }
        // might use this in progress -- not sure yet
        getAllRatings(courseId, moduleId, instructorId) {
            return __awaiter(this, void 0, void 0, function* () {
                const courseRating = yield this.getCourseRating(courseId);
                const moduleRating = yield this.getModuleRating(moduleId);
                const instructorRating = yield this.getInstructorRating(instructorId);
                return {
                    courseRating,
                    moduleRating,
                    instructorRating,
                };
            });
        }
        delete(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield this.ratingModel.deleteOne({ _id: id });
                if (result.deletedCount === 0) {
                    throw new common_1.NotFoundException(`Rating record with ID ${id} not found`);
                }
            });
        }
    };
    __setFunctionName(_classThis, "RatingService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RatingService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RatingService = _classThis;
})();
exports.RatingService = RatingService;
