"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
// export interface ProductType {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   password: string;
//   role: string;
//   createdAt: Date;
// }
exports.Product = new typeorm_1.EntitySchema({
    name: "product",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        name: {
            type: String,
        },
        rating: {
            type: String,
        },
        comment: {
            type: String,
            unique: true,
        },
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
    },
});
//# sourceMappingURL=Ratings.js.map