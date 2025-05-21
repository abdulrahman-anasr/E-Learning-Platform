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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("./decorators/public.decorator");
let AuthController = (() => {
    let _classDecorators = [(0, common_1.Controller)('auth')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _signIn_decorators;
    let _signup_decorators;
    var AuthController = _classThis = class {
        constructor(authService, userService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
            this.userService = userService;
        }
        signIn(signInDto, res) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    console.log('helllo');
                    const result = yield this.authService.signIn(signInDto.email, signInDto.password);
                    console.log("result", result);
                    const user = this.userService.findById(result.userId);
                    const role = (yield user).role;
                    res.cookie('token', result.access_token, {
                        httpOnly: true, // Prevents client-side JavaScript access
                        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                        maxAge: 3600 * 1000, // Cookie expiration time in milliseconds
                    });
                    res.cookie('userId', result.userId, {
                        httpOnly: true, // Prevents client-side JavaScript access
                        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                        maxAge: 3600 * 1000, // Cookie expiration time in milliseconds
                    });
                    res.cookie('role', role, {
                        httpOnly: true, // Prevents client-side JavaScript access
                        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                        maxAge: 3600 * 1000, // Cookie expiration time in milliseconds
                    });
                    console.log("cookie", res.cookie);
                    // Return success
                    return {
                        statusCode: common_1.HttpStatus.OK,
                        message: 'Login successful',
                        //user: result.payload,
                    };
                }
                catch (error) {
                    console.log(error);
                    // Handle specific errors
                    if (error instanceof common_1.HttpException) {
                        throw error; // Pass through known exceptions
                    }
                    // Handle other unexpected errors
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'An error occurred during login',
                    }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            });
        }
        signup(registerRequestDto) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    // Call the AuthService to handle registration
                    const result = yield this.authService.register(registerRequestDto);
                    // Return a success response with HTTP 201 Created status
                    return {
                        statusCode: common_1.HttpStatus.CREATED,
                        message: 'User registered successfully',
                        data: result,
                    };
                }
                catch (error) {
                    // Handle specific errors, such as email already exists or validation errors
                    if (error.status === 409) {
                        throw new common_1.HttpException({
                            statusCode: common_1.HttpStatus.CONFLICT,
                            message: 'User already exists',
                        }, common_1.HttpStatus.CONFLICT);
                    }
                    // Catch any other errors and throw a generic internal server error
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'An error occurred during registration',
                    }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                }
            });
        }
    };
    __setFunctionName(_classThis, "AuthController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _signIn_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Post)('login')];
        _signup_decorators = [(0, public_decorator_1.Public)(), (0, common_1.Post)('register')];
        __esDecorate(_classThis, null, _signIn_decorators, { kind: "method", name: "signIn", static: false, private: false, access: { has: obj => "signIn" in obj, get: obj => obj.signIn }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _signup_decorators, { kind: "method", name: "signup", static: false, private: false, access: { has: obj => "signup" in obj, get: obj => obj.signup }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthController = _classThis;
})();
exports.AuthController = AuthController;
