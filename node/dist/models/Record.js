"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = void 0;
class Record {
    constructor(values) {
        var _a;
        this.id = values === null || values === void 0 ? void 0 : values.id;
        this.name = values === null || values === void 0 ? void 0 : values.name;
        this.description = values === null || values === void 0 ? void 0 : values.description;
        this.createdDateTime = (_a = values === null || values === void 0 ? void 0 : values.created_date) !== null && _a !== void 0 ? _a : values === null || values === void 0 ? void 0 : values.createdDateTime;
    }
}
exports.Record = Record;
//# sourceMappingURL=Record.js.map