"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const isUserAuthorized = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new common_1.UnauthorizedException('User does not have the required role');
        }
        next();
    };
};
exports.default = isUserAuthorized;
