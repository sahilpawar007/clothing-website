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
exports.ShippingInfo = void 0;
// ShippingInfo.ts
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Order_1 = require("./Order");
let ShippingInfo = class ShippingInfo {
};
exports.ShippingInfo = ShippingInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ShippingInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ShippingInfo.prototype, "address1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ShippingInfo.prototype, "address2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ShippingInfo.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ShippingInfo.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ShippingInfo.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ShippingInfo.prototype, "pinCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ShippingInfo.prototype, "phoneNo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.shippingInfo),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], ShippingInfo.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_1.Orders, (orders) => orders.shippingInfo),
    __metadata("design:type", Array)
], ShippingInfo.prototype, "orders", void 0);
exports.ShippingInfo = ShippingInfo = __decorate([
    (0, typeorm_1.Entity)()
], ShippingInfo);
//# sourceMappingURL=Shipping.js.map