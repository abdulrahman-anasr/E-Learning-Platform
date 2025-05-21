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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
/* eslint-disable prettier/prettier */
// room.service.ts
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let RoomService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RoomService = _classThis = class {
        constructor(roomModel, courseModel, userService) {
            this.roomModel = roomModel;
            this.courseModel = courseModel;
            this.userService = userService;
        }
        // Create a new room for a specific course
        createRoom(createRoomDto, courseName, userId) {
            return __awaiter(this, void 0, void 0, function* () {
                // Step 1: Find the course by its title (name)
                const course = yield this.courseModel.findOne({ title: courseName });
                if (!course) {
                    // Instead of a generic error, throw an HTTP exception with 404 status
                    throw new common_1.HttpException('Course not found', common_1.HttpStatus.NOT_FOUND);
                }
                // Step 2: Check if the user is enrolled in the course
                const userIsEnrolled = course.students.some((student) => student.toString() === userId);
                if (!userIsEnrolled) {
                    // Throw an HTTP exception with 403 status if user is not enrolled
                    throw new common_1.HttpException('User is not enrolled in the course', common_1.HttpStatus.FORBIDDEN);
                }
                // Step 3: Create the room with the associated course ObjectId
                const room = new this.roomModel(Object.assign(Object.assign({}, createRoomDto), { course: course._id }));
                // Step 4: Save and return the room
                return room.save();
            });
        }
        createPrivateRoom(loggedInUserId, createRoomDto, courseId) {
            return __awaiter(this, void 0, void 0, function* () {
                // Step 1: Fetch the logged-in user
                const loggedInUser = yield this.userService.findById(loggedInUserId.toString());
                if (!loggedInUser) {
                    throw new common_1.HttpException('Logged-in user not found', common_1.HttpStatus.NOT_FOUND);
                }
                // Step 2: Ensure that one of the users is an instructor
                const instructor = createRoomDto.instructor;
                if (instructor.toString() !== loggedInUserId.toString() && loggedInUser.role !== 'Instructor') {
                    throw new common_1.HttpException('Only the instructor can create the room', common_1.HttpStatus.FORBIDDEN);
                }
                // Step 3: Fetch the course by ID
                const course = yield this.courseModel.findById(courseId);
                if (!course) {
                    throw new common_1.HttpException('Course not found', common_1.HttpStatus.NOT_FOUND);
                }
                // Step 4: Ensure that the instructor is the one teaching the course
                if (course.instructor.toString() !== instructor.toString()) {
                    throw new common_1.HttpException('Instructor does not teach this course', common_1.HttpStatus.FORBIDDEN);
                }
                // Step 5: Ensure both the instructor and the students are enrolled in the course
                const studentIds = createRoomDto.students;
                const allUsersEnrolled = [...studentIds, instructor.toString()].every((userId) => course.students.some((student) => student.toString() === userId));
                if (!allUsersEnrolled) {
                    throw new common_1.HttpException('All users must be enrolled in the course', common_1.HttpStatus.FORBIDDEN);
                }
                // Step 6: Generate a private room ID
                const roomId = yield this.generatePrivateRoomId(instructor, studentIds[0]); // Assumes one student for private room creation
                // Step 7: Check if the private room already exists
                const existingRoom = yield this.roomModel.findOne({ roomId });
                if (existingRoom) {
                    throw new common_1.HttpException('Private room already exists.', common_1.HttpStatus.BAD_REQUEST);
                }
                // Step 8: Create the private room using DTO
                const newRoom = new this.roomModel({
                    roomId,
                    users: [createRoomDto.instructor, ...createRoomDto.students], // Uses the DTO instructor and students
                    isPrivate: true,
                    course: courseId, // Associate the room with the course
                    name: createRoomDto.name, // Use the name from DTO
                });
                return newRoom.save();
            });
        }
        generatePrivateRoomId(userId1, userId2) {
            return __awaiter(this, void 0, void 0, function* () {
                // Sort user IDs so that the room ID is always the same regardless of the order
                const ids = [userId1.toString(), userId2.toString()];
                ids.sort();
                return ids.join('-'); // Example: 'user1Id-user2Id'
            });
        }
        // Get rooms by course ID
        getRoomsByCourse(courseId) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.roomModel.find({ course: courseId }).populate('users');
            });
        }
        // Get room details by name
        getRoomByName(roomName) {
            return __awaiter(this, void 0, void 0, function* () {
                const room = yield this.roomModel.findOne({ name: roomName }).populate('users');
                if (!room) {
                    throw new Error('Room not found');
                }
                return room;
            });
        }
        // Mark room as inactive
        setRoomInactive(roomId) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.roomModel.findByIdAndUpdate(roomId, { active: false }, { new: true });
            });
        }
        joinRoom(roomName, id) {
            return __awaiter(this, void 0, void 0, function* () {
                const room = yield this.roomModel.findOne({ name: roomName });
                room.user_id.push(new mongoose_1.Types.ObjectId(id));
                return yield room.save();
            });
        }
        leaveRoom(roomName, id) {
            return __awaiter(this, void 0, void 0, function* () {
                let room = yield this.roomModel.findOne({ name: roomName });
                room.user_id = room.user_id.filter(x => x.toString() !== id);
                return yield room.save();
            });
        }
        checkUserInRoom(roomName, id) {
            return __awaiter(this, void 0, void 0, function* () {
                let room = yield this.roomModel.findOne({ name: roomName });
                let user = room.user_id.find(x => x.toString() === id);
                if (user)
                    return true;
                return false;
            });
        }
    };
    __setFunctionName(_classThis, "RoomService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RoomService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoomService = _classThis;
})();
exports.RoomService = RoomService;
