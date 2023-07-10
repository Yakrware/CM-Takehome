export type ApiResponse = {
  success: boolean;
  error?: string;
  json?: T;
};

export type BodyParams = {
  method: string;
  body?: T;
}
