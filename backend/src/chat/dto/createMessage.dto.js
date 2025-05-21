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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageDto = exports.ChatType = void 0;
/* eslint-disable prettier/prettier */
const class_validator_1 = require("class-validator");
// Enum for chat type (group or individual)
var ChatType;
(function (ChatType) {
    ChatType["GROUP"] = "group";
    ChatType["INDIVIDUAL"] = "individual";
})(ChatType || (exports.ChatType = ChatType = {}));
let CreateMessageDto = (() => {
    var _a;
    let _userId_decorators;
    let _userId_initializers = [];
    let _userId_extraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _roomId_decorators;
    let _roomId_initializers = [];
    let _roomId_extraInitializers = [];
    let _chatType_decorators;
    let _chatType_initializers = [];
    let _chatType_extraInitializers = [];
    let _recipientId_decorators;
    let _recipientId_initializers = [];
    let _recipientId_extraInitializers = [];
    return _a = class CreateMessageDto {
            constructor() {
                this.userId = __runInitializers(this, _userId_initializers, void 0); // ID of the user sending the message
                this.content = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _content_initializers, void 0)); // Content of the message
                this.roomId = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _roomId_initializers, void 0)); // The room where the message is being sent (group or individual)
                this.chatType = (__runInitializers(this, _roomId_extraInitializers), __runInitializers(this, _chatType_initializers, void 0)); // Type of chat, either group or individual
                this.recipientId = (__runInitializers(this, _chatType_extraInitializers), __runInitializers(this, _recipientId_initializers, void 0)); // Recipient ID (for individual chat only, optional)
                __runInitializers(this, _recipientId_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _userId_decorators = [(0, class_validator_1.IsMongoId)(), (0, class_validator_1.IsNotEmpty)()];
            _content_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _roomId_decorators = [(0, class_validator_1.IsMongoId)(), (0, class_validator_1.IsNotEmpty)()];
            _chatType_decorators = [(0, class_validator_1.IsEnum)(ChatType)];
            _recipientId_decorators = [(0, class_validator_1.IsMongoId)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: obj => "userId" in obj, get: obj => obj.userId, set: (obj, value) => { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _roomId_decorators, { kind: "field", name: "roomId", static: false, private: false, access: { has: obj => "roomId" in obj, get: obj => obj.roomId, set: (obj, value) => { obj.roomId = value; } }, metadata: _metadata }, _roomId_initializers, _roomId_extraInitializers);
            __esDecorate(null, null, _chatType_decorators, { kind: "field", name: "chatType", static: false, private: false, access: { has: obj => "chatType" in obj, get: obj => obj.chatType, set: (obj, value) => { obj.chatType = value; } }, metadata: _metadata }, _chatType_initializers, _chatType_extraInitializers);
            __esDecorate(null, null, _recipientId_decorators, { kind: "field", name: "recipientId", static: false, private: false, access: { has: obj => "recipientId" in obj, get: obj => obj.recipientId, set: (obj, value) => { obj.recipientId = value; } }, metadata: _metadata }, _recipientId_initializers, _recipientId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.CreateMessageDto = CreateMessageDto;
