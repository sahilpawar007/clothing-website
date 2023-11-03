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
exports.PaymentInfo = void 0;
// PaymentInfo.ts
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Order_1 = require("./Order");
let PaymentInfo = class PaymentInfo {
};
exports.PaymentInfo = PaymentInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PaymentInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PaymentInfo.prototype, "paymentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PaymentInfo.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], PaymentInfo.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.paymentInfo),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], PaymentInfo.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Order_1.Orders),
    (0, typeorm_1.JoinColumn)({ name: "orderId" }),
    __metadata("design:type", Order_1.Orders)
], PaymentInfo.prototype, "order", void 0);
exports.PaymentInfo = PaymentInfo = __decorate([
    (0, typeorm_1.Entity)()
], PaymentInfo);
//# sourceMappingURL=Payment.js.map