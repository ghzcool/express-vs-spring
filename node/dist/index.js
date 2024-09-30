"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressApp_1 = __importDefault(require("./app/expressApp"));
const registerAutowireComponents_1 = __importDefault(require("./app/registerAutowireComponents"));
const registerControllers_1 = __importDefault(require("./app/registerControllers"));
console.log('Starting...');
console.log("Registered autowire components:", registerAutowireComponents_1.default.join(", "));
console.log("Registered express controllers:", registerControllers_1.default.join(", "));
expressApp_1.default.get('/*', (req, res) => {
    res.send('App is up!');
});
const port = process.env.API_PORT || 8080;
expressApp_1.default.listen(port, () => {
    console.log(`Listening at ${port}`);
});
//# sourceMappingURL=index.js.map