"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordRepository = void 0;
const express_decorators_1 = require("@ppirogov/express-decorators");
const mariadb_1 = __importDefault(require("mariadb"));
const pool = mariadb_1.default.createPool({
    host: (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : 'localhost',
    user: (_b = process.env.DB_USER) !== null && _b !== void 0 ? _b : 'spring_vs_node',
    connectionLimit: 5,
    password: (_c = process.env.DB_PASSWORD) !== null && _c !== void 0 ? _c : 'spring_vs_node'
});
let RecordRepository = class RecordRepository {
    getRecords() {
        return __awaiter(this, void 0, void 0, function* () {
            let conn;
            try {
                conn = yield pool.getConnection();
                return yield conn.query('SELECT * from spring_vs_node.record order by id DESC limit 10');
            }
            finally {
                if (conn)
                    conn.release();
            }
        });
    }
    insertRecord(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, description }) {
            let conn;
            try {
                conn = yield pool.getConnection();
                yield conn.query(`INSERT INTO spring_vs_node.record (name, description, created_date)
                        VALUES ('${name}', '${description}', NOW());`);
                const records = yield conn.query('SELECT * FROM spring_vs_node.record ORDER BY id DESC LIMIT 1');
                return records[0];
            }
            finally {
                if (conn)
                    conn.release();
            }
        });
    }
};
exports.RecordRepository = RecordRepository;
exports.RecordRepository = RecordRepository = __decorate([
    express_decorators_1.AutowireComponent
], RecordRepository);
//# sourceMappingURL=RecordRepository.js.map