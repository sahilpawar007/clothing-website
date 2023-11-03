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
exports.OrderItems = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const Order_1 = require("./Order");
// import { Images } from "./Images";
let OrderItems = class OrderItems {
};
exports.OrderItems = OrderItems;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderItems.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderItems.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItems.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItems.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, (product) => product.orderItems),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Product_1.Product)
], OrderItems.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order_1.Orders, (orders) => orders.orderItems),
    __metadata("design:type", Order_1.Orders)
], OrderItems.prototype, "orders", void 0);
exports.OrderItems = OrderItems = __decorate([
    (0, typeorm_1.Entity)()
], OrderItems);
//# sourceMappingURL=OrderItems.js.map