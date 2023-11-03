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
exports.Orders = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User"); // Assuming you have a User entity
const Shipping_1 = require("./Shipping");
const OrderItems_1 = require("./OrderItems");
let Orders = class Orders {
};
exports.Orders = Orders;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Orders.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Shipping_1.ShippingInfo, (shippingInfo) => shippingInfo.orders),
    (0, typeorm_1.JoinColumn)({ name: "shippingInfo" }),
    __metadata("design:type", Shipping_1.ShippingInfo)
], Orders.prototype, "shippingInfo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.orders),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.User)
], Orders.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderItems_1.OrderItems, (orderItems) => orderItems.orders, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Orders.prototype, "orderItems", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Orders.prototype, "itemsPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Orders.prototype, "taxPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Orders.prototype, "shippingPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Orders.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Processing" }),
    __metadata("design:type", String)
], Orders.prototype, "orderStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Orders.prototype, "deliveredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Orders.prototype, "createdAt", void 0);
exports.Orders = Orders = __decorate([
    (0, typeorm_1.Entity)()
], Orders);
//# sourceMappingURL=Order.js.map