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
exports.RoomController = void 0;
/* eslint-disable prettier/prettier */
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let RoomController = (() => {
    let _classDecorators = [(0, common_1.Controller)('courses/:courseId/rooms')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _createRoom_decorators;
    let _getRoomByName_decorators;
    let _createPrivateRoom_decorators;
    var RoomController = _classThis = class {
        constructor(messageModel, roomModel, courseModel, roomService) {
            this.messageModel = (__runInitializers(this, _instanceExtraInitializers), messageModel);
            this.roomModel = roomModel;
            this.courseModel = courseModel;
            this.roomService = roomService;
        }
        // Create a group chat room for a course
        createRoom(createRoomDto, courseId, userId // User ID from the request body
        ) {
            return __awaiter(this, void 0, void 0, function* () {
                // Step 1: Find the course by its ID
                const course = yield this.courseModel.findById(courseId);
                if (!course) {
                    throw new Error('Course not found');
                }
                // Step 2: Check if the user is enrolled in the course
                const userIsEnrolled = course.students.some((student) => student.toString() === userId.toString());
                if (!userIsEnrolled) {
                    throw new Error('User is not enrolled in the course');
                }
                // Step 3: Create the room
                const room = new this.roomModel(Object.assign(Object.assign({}, createRoomDto), { course: courseId }));
                // Step 4: Save and return the room
                return room.save();
            });
        }
        // Get a specific room by its ID
        getRoomByName(roomName) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.roomService.getRoomByName(roomName);
            });
        }
        // Create a private chat room between a student and instructor
        createPrivateRoom(createRoomDto, courseId, userId // Access the request object
        ) {
            return __awaiter(this, void 0, void 0, function* () {
                const courseIdObj = new mongoose_1.Types.ObjectId(courseId);
                const loggedInUserIdObj = new mongoose_1.Types.ObjectId(userId); // Access the logged-in user's ID from the request
                // Now call the service to create the room
                return this.roomService.createPrivateRoom(loggedInUserIdObj, createRoomDto, courseIdObj);
            });
        }
    };
    __setFunctionName(_classThis, "RoomController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createRoom_decorators = [(0, common_1.Post)()];
        _getRoomByName_decorators = [(0, common_1.Get)('name/:name')];
        _createPrivateRoom_decorators = [(0, common_1.Post)('private/:courseId')];
        __esDecorate(_classThis, null, _createRoom_decorators, { kind: "method", name: "createRoom", static: false, private: false, access: { has: obj => "createRoom" in obj, get: obj => obj.createRoom }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getRoomByName_decorators, { kind: "method", name: "getRoomByName", static: false, private: false, access: { has: obj => "getRoomByName" in obj, get: obj => obj.getRoomByName }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createPrivateRoom_decorators, { kind: "method", name: "createPrivateRoom", static: false, private: false, access: { has: obj => "createPrivateRoom" in obj, get: obj => obj.createPrivateRoom }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RoomController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoomController = _classThis;
})();
exports.RoomController = RoomController;
