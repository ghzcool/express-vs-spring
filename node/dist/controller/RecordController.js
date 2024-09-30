"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordController = void 0;
const express_decorators_1 = require("@ppirogov/express-decorators");
let RecordController = class RecordController {
    recordPost(req, res) {
        this.recordService.createRecord(req.body).then(record => {
            res.setHeader('Content-Type', 'application/json');
            res.send(record);
        }).catch(error => {
            console.error(error);
            res.status(500).end();
        });
    }
    recordsGet(req, res) {
        this.recordService.getRecords().then(records => {
            res.setHeader('Content-Type', 'application/json');
            res.send(records);
        }).catch(error => {
            console.error(error);
            res.status(500).end();
        });
    }
};
exports.RecordController = RecordController;
__decorate([
    (0, express_decorators_1.Autowire)('RecordService'),
    __metadata("design:type", Object)
], RecordController.prototype, "recordService", void 0);
__decorate([
    (0, express_decorators_1.PostMapping)('/api/records'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RecordController.prototype, "recordPost", null);
__decorate([
    (0, express_decorators_1.GetMapping)('/api/records'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RecordController.prototype, "recordsGet", null);
exports.RecordController = RecordController = __decorate([
    express_decorators_1.ExpressController
], RecordController);
//# sourceMappingURL=RecordController.js.map