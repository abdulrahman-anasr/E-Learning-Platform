"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.BackupController = void 0;
/* eslint-disable prettier/prettier */
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const roles_decorator_1 = require("src/auth/decorators/roles.decorator");
const authorization_guards_1 = require("src/auth/guards/authorization.guards");
let BackupController = (() => {
    let _classDecorators = [(0, common_1.Controller)('backup')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _triggerBackup_decorators;
    let _listBackups_decorators;
    var BackupController = _classThis = class {
        constructor(backupService) {
            this.backupService = (__runInitializers(this, _instanceExtraInitializers), backupService);
            this.logger = new common_1.Logger(BackupController.name);
        }
        // Endpoint to trigger the backup manually
        triggerBackup() {
            return __awaiter(this, void 0, void 0, function* () {
                this.logger.log('Manual backup triggered.');
                yield this.backupService.backupData();
                return { message: 'Backup successfully triggered.' };
            });
        }
        // Endpoint to list all existing backup files
        listBackups() {
            const backupPath = path.join(__dirname, '..', '..', 'backups');
            if (!fs.existsSync(backupPath)) {
                return { message: 'No backups found.' };
            }
            const files = fs.readdirSync(backupPath).map((file) => ({
                filename: file,
                path: path.join(backupPath, file),
            }));
            return { backups: files };
        }
    };
    __setFunctionName(_classThis, "BackupController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _triggerBackup_decorators = [(0, roles_decorator_1.Roles)(roles_decorator_1.Role.Admin, roles_decorator_1.Role.Instructor), (0, common_1.UseGuards)(authorization_guards_1.authorizationGuard), (0, common_1.Get)('trigger')];
        _listBackups_decorators = [(0, roles_decorator_1.Roles)(roles_decorator_1.Role.Admin, roles_decorator_1.Role.Instructor), (0, common_1.UseGuards)(authorization_guards_1.authorizationGuard), (0, common_1.Get)('list')];
        __esDecorate(_classThis, null, _triggerBackup_decorators, { kind: "method", name: "triggerBackup", static: false, private: false, access: { has: obj => "triggerBackup" in obj, get: obj => obj.triggerBackup }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listBackups_decorators, { kind: "method", name: "listBackups", static: false, private: false, access: { has: obj => "listBackups" in obj, get: obj => obj.listBackups }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BackupController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BackupController = _classThis;
})();
exports.BackupController = BackupController;
