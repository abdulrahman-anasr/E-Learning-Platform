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
exports.ThreadController = void 0;
/* eslint-disable prettier/prettier */
const common_1 = require("@nestjs/common");
let ThreadController = (() => {
    let _classDecorators = [(0, common_1.Controller)('threads')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createThread_decorators;
    let _updateThread_decorators;
    let _searchThreads_decorators;
    let _deleteThread_decorators;
    let _getReplies_decorators;
    var ThreadController = _classThis = class {
        constructor(threadService) {
            this.threadService = (__runInitializers(this, _instanceExtraInitializers), threadService);
        }
        createThread(req, createThreadDto) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.threadService.createThread(req, createThreadDto);
            });
        }
        updateThread(updateThreadDto) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.threadService.updateThread(updateThreadDto);
            });
        }
        searchThreads(keyword) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.threadService.searchThreadsByKeyword(keyword);
            });
        }
        deleteThread(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.threadService.deleteThread(id);
            });
        }
        getReplies(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.threadService.getThreadReplies(id);
            });
        }
    };
    __setFunctionName(_classThis, "ThreadController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createThread_decorators = [(0, common_1.Post)('create')];
        _updateThread_decorators = [(0, common_1.Put)('update')];
        _searchThreads_decorators = [(0, common_1.Get)('search')];
        _deleteThread_decorators = [(0, common_1.Delete)('delete')];
        _getReplies_decorators = [(0, common_1.Get)('getReplies')];
        __esDecorate(_classThis, null, _createThread_decorators, { kind: "method", name: "createThread", static: false, private: false, access: { has: obj => "createThread" in obj, get: obj => obj.createThread }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateThread_decorators, { kind: "method", name: "updateThread", static: false, private: false, access: { has: obj => "updateThread" in obj, get: obj => obj.updateThread }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _searchThreads_decorators, { kind: "method", name: "searchThreads", static: false, private: false, access: { has: obj => "searchThreads" in obj, get: obj => obj.searchThreads }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteThread_decorators, { kind: "method", name: "deleteThread", static: false, private: false, access: { has: obj => "deleteThread" in obj, get: obj => obj.deleteThread }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getReplies_decorators, { kind: "method", name: "getReplies", static: false, private: false, access: { has: obj => "getReplies" in obj, get: obj => obj.getReplies }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ThreadController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ThreadController = _classThis;
})();
exports.ThreadController = ThreadController;
