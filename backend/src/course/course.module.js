"use strict";
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const course_schema_1 = require("../models/course-schema"); // Adjust the import based on your model location
const course_service_1 = require("./course.service");
const course_controller_1 = require("./course.controller");
const notification_service_1 = require("src/notification/notification.service");
const notification_schema_1 = require("models/notification-schema");
const message_service_1 = require("src/chat/message.service");
const message_schema_1 = require("models/message-schema");
const room_schema_1 = require("models/room-schema");
const user_service_1 = require("src/user/user.service");
const user_module_1 = require("src/user/user.module");
const room_service_1 = require("src/room/room.service");
const jwt_1 = require("@nestjs/jwt");
const progress_service_1 = require("src/progress/progress.service");
const auth_service_1 = require("src/auth/auth.service");
const progress_schema_1 = require("models/progress-schema");
const responses_schema_1 = require("models/responses-schema");
const quizzes_schema_1 = require("models/quizzes-schema");
const module_schema_1 = require("models/module-schema");
const rating_schema_1 = require("models/rating-schema");
const rating_service_1 = require("src/rating/rating.service");
const forum_schema_1 = require("models/forum-schema");
const forum_service_1 = require("src/forum/forum.service");
const thread_schema_1 = require("models/thread-schema");
const thread_service_1 = require("src/thread/thread.service");
const reply_schema_1 = require("models/reply-schema");
const reply_service_1 = require("src/reply/reply.service");
let CourseModule = (() => {
    let _classDecorators = [(0, common_1.Module)({
            imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Course', schema: course_schema_1.CourseSchema },
                    { name: 'UserNotification', schema: notification_schema_1.NotificationSchema },
                    { name: "Message", schema: message_schema_1.MessageSchema },
                    { name: "Room", schema: room_schema_1.RoomSchema },
                    { name: "Progress", schema: progress_schema_1.ProgressSchema },
                    { name: "Responses", schema: responses_schema_1.ResponseSchema },
                    { name: "Quiz", schema: quizzes_schema_1.QuizSchema },
                    { name: "Module", schema: module_schema_1.ModuleSchema },
                    { name: "Rating", schema: rating_schema_1.RatingSchema },
                    { name: "Forum", schema: forum_schema_1.ForumSchema },
                    { name: "Thread", schema: thread_schema_1.ThreadSchema },
                    { name: "Reply", schema: reply_schema_1.ReplySchema }
                ]),
                user_module_1.UserModule],
            controllers: [course_controller_1.CourseController],
            providers: [course_service_1.CourseService, notification_service_1.NotificationService, message_service_1.MessageService, user_service_1.UserService, room_service_1.RoomService, jwt_1.JwtService,
                progress_service_1.ProgressService, auth_service_1.AuthService, rating_service_1.RatingService, forum_service_1.ForumService, thread_service_1.ThreadService, reply_service_1.ReplyService
            ],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CourseModule = _classThis = class {
    };
    __setFunctionName(_classThis, "CourseModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CourseModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CourseModule = _classThis;
})();
exports.CourseModule = CourseModule;
