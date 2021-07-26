interface Dates {
  start_date?: string;
  end_date?: string;
}

export interface QueryFetchAll {
  filter: object;
  dates: Dates;
  page: number;
  per_page: number;
  order: "DESC" | "ASC";
}