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
exports.ProgressController = void 0;
/* eslint-disable prettier/prettier */
const common_1 = require("@nestjs/common");
let ProgressController = (() => {
    let _classDecorators = [(0, common_1.Controller)('progress')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _create_decorators;
    let _findAll_decorators;
    let _findOne_decorators;
    let _update_decorators;
    let _delete_decorators;
    let _getCompletedCourses_decorators;
    let _getDashboard_decorators;
    let _getInstructorAnalyticsAssessmentResults_decorators;
    let _getInstructorAnalyticsContentEffectiveness_decorators;
    let _getInstructorAnalyticsStudentEngagement_decorators;
    let _exportStudentEngagementPDF_decorators;
    let _exportAssessmentResultPDF_decorators;
    let _exportContentEffectivenessPDF_decorators;
    let _getUserPerformance_decorators;
    var ProgressController = _classThis = class {
        constructor(progressService) {
            this.progressService = (__runInitializers(this, _instanceExtraInitializers), progressService);
        }
        // Create a new progress record
        create(progressData) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.progressService.create(progressData);
            });
        }
        // Get all progress records
        findAll() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.progressService.findAll();
            });
        }
        // Get a specific progress record by ID
        findOne(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.progressService.findOne(id);
            });
        }
        // Update a specific progress record by ID
        update(id, progressData) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.progressService.update(id, progressData);
            });
        }
        // Delete a specific progress record by ID
        delete(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.progressService.delete(id);
            });
        }
        // Get completed courses
        getCompletedCourses(userId) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.progressService.getCompletedCourses(userId);
            });
        }
        // Get dashboard
        getDashboard(userId) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.progressService.getDashboard(userId);
            });
        }
        //getInstructorAnalyticsAssessmentResults
        getInstructorAnalyticsAssessmentResults(courseId) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.progressService.getInstructorAnalyticsAssessmentResults(courseId);
            });
        }
        //getInstructorAnalyticsContentEffectiveness
        getInstructorAnalyticsContentEffectiveness(courseId, userId) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.progressService.getInstructorAnalyticsContentEffectiveness(courseId, userId);
            });
        }
        // getInstructorAnalyticsStudentEngagement
        getInstructorAnalyticsStudentEngagement(courseId) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.progressService.getInstructorAnalyticsStudentEngagement(courseId);
            });
        }
        exportStudentEngagementPDF(courseId, res) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.progressService.exportInstructorAnalyticsStudentEngagementPDF(courseId, res);
            });
        }
        exportAssessmentResultPDF(courseId, res) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.progressService.exportInstructorAnalyticsAssessmentResultsPDF(courseId, res);
            });
        }
        exportContentEffectivenessPDF(courseId, userId, res) {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.progressService.exportInstructorAnalyticsContentEffectivenessPDF(courseId, userId, res);
            });
        }
        getUserPerformance(userId) {
            return __awaiter(this, void 0, void 0, function* () {
                const classification = yield this.progressService.classifyUserPerformance(userId);
                return {
                    userId,
                    classification,
                };
            });
        }
    };
    __setFunctionName(_classThis, "ProgressController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)('createprogress')];
        _findAll_decorators = [(0, common_1.Get)()];
        _findOne_decorators = [(0, common_1.Get)(':id')];
        _update_decorators = [(0, common_1.Put)(':id')];
        _delete_decorators = [(0, common_1.Delete)(':id')];
        _getCompletedCourses_decorators = [(0, common_1.Get)('completed/:userId')];
        _getDashboard_decorators = [(0, common_1.Get)('dashboard/:userId')];
        _getInstructorAnalyticsAssessmentResults_decorators = [(0, common_1.Get)('assessment-results/:courseId')];
        _getInstructorAnalyticsContentEffectiveness_decorators = [(0, common_1.Get)('content-effectiveness/:courseId/:userId')];
        _getInstructorAnalyticsStudentEngagement_decorators = [(0, common_1.Get)('student-engagement/:courseId')];
        _exportStudentEngagementPDF_decorators = [(0, common_1.Get)('/export-student-engagement/pdf/:courseId')];
        _exportAssessmentResultPDF_decorators = [(0, common_1.Get)('/export-assessment-results/pdf/:courseId')];
        _exportContentEffectivenessPDF_decorators = [(0, common_1.Get)('/export-content-effectivenes/pdf/:courseId')];
        _getUserPerformance_decorators = [(0, common_1.Get)(':userId/performance')];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: obj => "findAll" in obj, get: obj => obj.findAll }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: obj => "findOne" in obj, get: obj => obj.findOne }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: obj => "update" in obj, get: obj => obj.update }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: obj => "delete" in obj, get: obj => obj.delete }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCompletedCourses_decorators, { kind: "method", name: "getCompletedCourses", static: false, private: false, access: { has: obj => "getCompletedCourses" in obj, get: obj => obj.getCompletedCourses }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getDashboard_decorators, { kind: "method", name: "getDashboard", static: false, private: false, access: { has: obj => "getDashboard" in obj, get: obj => obj.getDashboard }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getInstructorAnalyticsAssessmentResults_decorators, { kind: "method", name: "getInstructorAnalyticsAssessmentResults", static: false, private: false, access: { has: obj => "getInstructorAnalyticsAssessmentResults" in obj, get: obj => obj.getInstructorAnalyticsAssessmentResults }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getInstructorAnalyticsContentEffectiveness_decorators, { kind: "method", name: "getInstructorAnalyticsContentEffectiveness", static: false, private: false, access: { has: obj => "getInstructorAnalyticsContentEffectiveness" in obj, get: obj => obj.getInstructorAnalyticsContentEffectiveness }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getInstructorAnalyticsStudentEngagement_decorators, { kind: "method", name: "getInstructorAnalyticsStudentEngagement", static: false, private: false, access: { has: obj => "getInstructorAnalyticsStudentEngagement" in obj, get: obj => obj.getInstructorAnalyticsStudentEngagement }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _exportStudentEngagementPDF_decorators, { kind: "method", name: "exportStudentEngagementPDF", static: false, private: false, access: { has: obj => "exportStudentEngagementPDF" in obj, get: obj => obj.exportStudentEngagementPDF }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _exportAssessmentResultPDF_decorators, { kind: "method", name: "exportAssessmentResultPDF", static: false, private: false, access: { has: obj => "exportAssessmentResultPDF" in obj, get: obj => obj.exportAssessmentResultPDF }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _exportContentEffectivenessPDF_decorators, { kind: "method", name: "exportContentEffectivenessPDF", static: false, private: false, access: { has: obj => "exportContentEffectivenessPDF" in obj, get: obj => obj.exportContentEffectivenessPDF }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUserPerformance_decorators, { kind: "method", name: "getUserPerformance", static: false, private: false, access: { has: obj => "getUserPerformance" in obj, get: obj => obj.getUserPerformance }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProgressController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProgressController = _classThis;
})();
exports.ProgressController = ProgressController;
