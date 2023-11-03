"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        var _a;
        const keyword = typeof this.queryStr.keyword === "string"
            ? this.queryStr.keyword
            : (_a = this.queryStr.keyword) === null || _a === void 0 ? void 0 : _a[0];
        if (keyword) {
            this.query = this.query.andWhere("name LIKE :keyword", {
                keyword: `%${keyword}%`,
            });
        }
        return this;
    }
    filter() {
        const queryCopy = Object.assign({}, this.queryStr);
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
        Object.entries(queryCopy).forEach(([key, value]) => {
            if (typeof value === "string") {
                const [op, val] = value.split(":");
                switch (op) {
                    case "gt":
                        this.query.andWhere(`${key} > :${key}`, { [key]: val });
                        break;
                    case "lt":
                        this.query.andWhere(`${key} < :${key}`, { [key]: val });
                        break;
                    case "gte":
                        this.query.andWhere(`${key} >= :${key}`, { [key]: val });
                        break;
                    case "lte":
                        this.query.andWhere(`${key} <= :${key}`, { [key]: val });
                        break;
                }
            }
        });
        return this;
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).offset(skip);
        return this;
    }
}
exports.default = ApiFeatures;
//# sourceMappingURL=apiFeatures.js.map