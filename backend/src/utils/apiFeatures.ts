import { SelectQueryBuilder } from "typeorm";

export interface QueryString {
  keyword?: string | string[];
  page?: string | string[];
  limit?: string | string[];
  [key: string]: string | string[] | undefined;
}

class ApiFeatures {
  public query: SelectQueryBuilder<any>;
  public queryStr: QueryString;

  constructor(query: SelectQueryBuilder<any>, queryStr: QueryString) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search(): ApiFeatures {
    const keyword =
      typeof this.queryStr.keyword === "string"
        ? this.queryStr.keyword
        : this.queryStr.keyword?.[0];
    if (keyword) {
      this.query = this.query.andWhere("name LIKE :keyword", {
        keyword: `%${keyword}%`,
      });
    }
    return this;
  }

  filter(): ApiFeatures {
    const queryCopy = { ...this.queryStr };
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

  pagination(resultPerPage: number): ApiFeatures {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).offset(skip);
    return this;
  }
}

export default ApiFeatures;
