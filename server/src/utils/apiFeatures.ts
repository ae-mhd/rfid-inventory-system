import mongoose from "mongoose";

class ApiFeatures {
  mongooseQuery: mongoose.Query<any, any>;
  queryString: { [key: string]: any };
  paginationResult: any;
  constructor(
    mongooseQuery: mongoose.Query<any, any>,
    queryString: { [key: string]: any }
  ) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  filter(
    initialExcludesFields: string[] = [],
    initialQuery: { [key: string]: any } = {}
  ) {
    const queryClone = { ...this.queryString };
    const excludesFields = [
      "page",
      "limit",
      "search",
      "fields",
      "populate",
      "sort",
      "search_fields",
      ...initialExcludesFields,
    ];

    // separate filter queries from others queries
    excludesFields.forEach((field) => delete queryClone[field]);
    this.mongooseQuery = this.mongooseQuery.find({
      ...initialQuery,
      ...queryClone,
    });
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortString = this.queryString.sort as string;
      const sortQuery = sortString.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortQuery);
    }
    return this;
  }
  populate(initialPopulate: string[] = [""]) {
    if (this.queryString.populate) {
      const populateString = this.queryString.populate.trim() as string;
      // exclude password if exist
      const populateFields = [
        ...populateString.split(","),
        ...initialPopulate,
      ].filter((field) => field.trim() !== "password");
      const populateQuery = populateFields.join(" ");
      this.mongooseQuery = this.mongooseQuery.populate(populateQuery);
    }
    return this;
  }
  // fields filter
  limitFields(excludedFields: string[] = [""]) {
    if (this.queryString.fields) {
      const fields = (this.queryString.fields as string).split(",").join(" ");
      // Exclude specified fields
      let filteredFields = fields;
      excludedFields.forEach((field) => {
        filteredFields = filteredFields.replace(new RegExp(field, "g"), "");
      });
      this.mongooseQuery = this.mongooseQuery.select(filteredFields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }

    return this;
  }
  paginate(countDocuments: number) {
    const page = parseInt(this.queryString.page as string) || 1;
    if (this.queryString.limit === "all") return this;
    const limit = parseInt(this.queryString.limit as string) || 20;
    const skip = (page - 1) * limit;

    const pagination: {
      current_page: number;
      total_pages: number;
      limit: number;
      next_page?: number;
      previous_page?: number;
    } = {
      current_page: page,
      total_pages: Math.ceil(countDocuments / limit),
      limit: limit,
      next_page: undefined,
      previous_page: undefined,
    };

    // next page
    if (page < pagination.total_pages) {
      pagination.next_page = page + 1;
    }
    // previous page
    if (page > 1) {
      pagination.previous_page = page - 1;
    }

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }

  search(searchField: Array<string>) {
    if (this.queryString.search) {
      const search = this.queryString.search.trim() as string;
      const query: { $or?: any[] } = {};
      let search_fields = [""];
      if (this.queryString.search_fields) {
        search_fields = this.queryString.search_fields
          .split(",")
          .map((field: string) => {
            if (field.trim() === "password") return;
            return field.trim();
          });
        query["$or"] = search_fields.map((field: string) => {
          return { [field]: { $regex: search, $options: "i" } };
        });
      } else {
        query["$or"] = searchField.map((field) => {
          return { [field]: { $regex: search, $options: "i" } };
        });
      }
      // const search = this.queryString.search as string;
      // const query: { $or?: any[] } = {};
      // query["$or"] = searchField.map((field) => {
      //   return { [field]: { $regex: search, $options: "i" } };
      // });
      this.mongooseQuery = this.mongooseQuery.find(query);
    }

    return this;
  }
}
export default ApiFeatures;
