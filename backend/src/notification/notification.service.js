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
exports.NotificationService = void 0;
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let NotificationService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var NotificationService = _classThis = class {
        constructor(notificationModel, messageModel, courseModel, userModel, userService) {
            this.notificationModel = notificationModel;
            this.messageModel = messageModel;
            this.courseModel = courseModel;
            this.userModel = userModel;
            this.userService = userService;
        }
        // Notify about a new course creation
        notifyCourseCreation(courseId, courseName) {
            return __awaiter(this, void 0, void 0, function* () {
                const message = `A new course "${courseName}" has been created. A new forum has also been created for this course.`;
                const users = yield this.userService.findAll();
                const userIds = [];
                const userIdsObj = [];
                users.forEach(function (value) {
                    userIds.push(value._id.toString());
                });
                userIds.forEach(function (value) {
                    userIdsObj.push(mongoose_1.Types.ObjectId.createFromHexString(value));
                });
                try {
                    const notification = new this.notificationModel({
                        user_id: userIdsObj,
                        message,
                        relatedMessageId: new mongoose_1.Types.ObjectId(courseId), // Link the course ID for tracking
                    });
                    return yield notification.save();
                }
                catch (error) {
                    console.error('Error creating course notification:', error);
                    throw new Error('Failed to create course notification');
                }
            });
        }
        notifyCourseUpdate(courseId, courseName) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    // Fetch the course details
                    const course = yield this.courseModel.findById(courseId).exec();
                    if (!course) {
                        throw new Error(`Course with ID ${courseId} not found.`);
                    }
                    const message = `The course "${courseName}" has been updated. Here are the updates: 
      Title: "${course.title}", 
      Description: "${course.description}", 
      Category: "${course.category}",
      Difficulty Level: "${course.difficulty_level}"`;
                    // Notify each student
                    for (const studentId of course.students) {
                        try {
                            const student = yield this.userModel.findById(studentId).exec();
                            if (!student) {
                                throw new Error(`Student with ID ${studentId} not found.`);
                            }
                            const notification = new this.notificationModel({
                                user_id: studentId,
                                message,
                                relatedMessageId: courseId,
                            });
                            student.notifications.push(notification); // Push notification ID to student
                            yield student.save(); // Save updated student
                            return yield notification.save(); // Save notification
                        }
                        catch (error) {
                            console.error(`Error notifying student ${studentId}:`, error);
                        }
                    }
                }
                catch (error) {
                    console.error('Error creating course notification:', error);
                    throw new Error('Failed to create course notification');
                }
            });
        }
        // Create a generic notification
        createNotification(userIds, message, relatedMessageId) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    // If a relatedMessageId is provided, append its content to the notification
                    if (relatedMessageId) {
                        const relatedMessage = yield this.messageModel.findById(relatedMessageId).lean();
                        if (relatedMessage && relatedMessage.content) {
                            message += `: "${relatedMessage.content}"`;
                        }
                    }
                    const userIdArray = Array.isArray(userIds) ? userIds : [userIds];
                    // Collect created notifications
                    const notifications = [];
                    console.log('userIdArray', userIdArray);
                    // Loop through each userId and create a notification
                    for (const userId of userIdArray) {
                        try {
                            const student = yield this.userModel.findById(userId).exec();
                            if (!student) {
                                throw new Error(`Student with ID ${userId} not found.`);
                            }
                            // Create the notification
                            const notification = new this.notificationModel({
                                user_id: userId,
                                message,
                                relatedMessageId,
                            });
                            // Save the notification to the student's notifications array
                            student.notifications.push(notification); // Assuming `notifications` stores ObjectIds
                            yield student.save(); // Save updated student
                            // Save the notification itself
                            const savedNotification = yield notification.save();
                            // Add the saved notification to the array
                            notifications.push(savedNotification.toObject());
                        }
                        catch (error) {
                            console.error(`Error notifying student ${userId}:`, error);
                        }
                    }
                    // Return the array of created notifications
                    return notifications;
                }
                catch (error) {
                    console.error('Error creating notifications:', error);
                    throw new Error('Failed to create notifications');
                }
            });
        }
        // Get all notifications for a user
        getUserNotifications(userId) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.notificationModel.find({ userId }).sort({ createdAt: -1 }).exec();
            });
        }
        // Mark a notification as read
        markAsRead(notificationId) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.notificationModel.findByIdAndUpdate(notificationId, { read: true }, { new: true });
            });
        }
        // Get notifications with additional message content
        getUserNotificationsWithMessages(userId) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.notificationModel
                    .find({ userId })
                    .sort({ createdAt: -1 })
                    .populate('relatedMessageId', 'content createdAt userId') // Populate message fields
                    .exec();
            });
        }
        // Get unread notifications for a user
        getUnreadNotifications(userId) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.notificationModel
                    .find({ userId: new mongoose_1.Types.ObjectId(userId), read: false })
                    .select('message createdAt read')
                    .exec();
            });
        }
    };
    __setFunctionName(_classThis, "NotificationService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationService = _classThis;
})();
exports.NotificationService = NotificationService;
