"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_decorators_1 = require("@ppirogov/express-decorators");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
(0, express_decorators_1.registerExpressApp)(app);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false, limit: '1mb' }));
app.use(body_parser_1.default.json({ type: 'application/json', limit: '1mb' }));
app.use(body_parser_1.default.text({ type: 'text/html', limit: '1mb' }));
exports.default = app;
//# sourceMappingURL=expressApp.js.map