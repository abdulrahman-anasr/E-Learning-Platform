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
exports.QuestionBankController = void 0;
const common_1 = require("@nestjs/common");
let QuestionBankController = (() => {
    let _classDecorators = [(0, common_1.Controller)('questionbank')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getAllQuestionBanks_decorators;
    let _getQuestionBankById_decorators;
    let _createQuestionBank_decorators;
    let _updateQuestionBank_decorators;
    let _deleteQuestionBank_decorators;
    var QuestionBankController = _classThis = class {
        constructor(questionBankService) {
            this.questionBankService = (__runInitializers(this, _instanceExtraInitializers), questionBankService);
        }
        getAllQuestionBanks() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.questionBankService.findAll();
            });
        }
        getQuestionBankById(id) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('Received ID: ' + id);
                return yield this.questionBankService.findById(id);
            });
        }
        createQuestionBank(questionBankData) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.questionBankService.create(questionBankData);
            });
        }
        updateQuestionBank(id, questionBankData) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('Received ID: ' + id);
                return yield this.questionBankService.update(id, questionBankData);
            });
        }
        deleteQuestionBank(id) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('Received ID: ' + id);
                return yield this.questionBankService.delete(id);
            });
        }
    };
    __setFunctionName(_classThis, "QuestionBankController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getAllQuestionBanks_decorators = [(0, common_1.Get)('allquestionbanks')];
        _getQuestionBankById_decorators = [(0, common_1.Get)('questionbank')];
        _createQuestionBank_decorators = [(0, common_1.Post)('createquestion')];
        _updateQuestionBank_decorators = [(0, common_1.Put)('updatequestionbank')];
        _deleteQuestionBank_decorators = [(0, common_1.Delete)('deletequestionbank')];
        __esDecorate(_classThis, null, _getAllQuestionBanks_decorators, { kind: "method", name: "getAllQuestionBanks", static: false, private: false, access: { has: obj => "getAllQuestionBanks" in obj, get: obj => obj.getAllQuestionBanks }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getQuestionBankById_decorators, { kind: "method", name: "getQuestionBankById", static: false, private: false, access: { has: obj => "getQuestionBankById" in obj, get: obj => obj.getQuestionBankById }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createQuestionBank_decorators, { kind: "method", name: "createQuestionBank", static: false, private: false, access: { has: obj => "createQuestionBank" in obj, get: obj => obj.createQuestionBank }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateQuestionBank_decorators, { kind: "method", name: "updateQuestionBank", static: false, private: false, access: { has: obj => "updateQuestionBank" in obj, get: obj => obj.updateQuestionBank }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteQuestionBank_decorators, { kind: "method", name: "deleteQuestionBank", static: false, private: false, access: { has: obj => "deleteQuestionBank" in obj, get: obj => obj.deleteQuestionBank }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        QuestionBankController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return QuestionBankController = _classThis;
})();
exports.QuestionBankController = QuestionBankController;
