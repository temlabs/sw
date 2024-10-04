export interface ErrorResponse {
  error: {
    code: number;
    field?: string;
    message: string;
    internalCode: string;
  };
}
