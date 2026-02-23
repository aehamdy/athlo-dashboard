function parseApiError(error: unknown): string {
  const DEFAULT_MESSAGE = "An unexpected error occurred";

  if (!error) return DEFAULT_MESSAGE;

  // Axios-like error shape
  if (typeof error === "object" && "response" in error) {
    const axiosError = error as {
      response?: {
        data?: {
          message?: string;
          errors?: Record<string, string[]>;
        };
      };
    };

    const responseData = axiosError.response?.data;

    // Handle backend messages
    if (responseData?.message) {
      switch (responseData.message) {
        case "Product Variant Duplicate In Request.":
          return "Duplicate variants are not allowed.";

        case "Product Variant Already Exists.":
          return "A variant with the same size and color already exists.";

        default:
          return responseData.message;
      }
    }

    // Handle validation errors object
    if (responseData?.errors) {
      return Object.entries(responseData.errors)
        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
        .join("; ");
    }
  }

  // Generic JS error
  if (error instanceof Error) {
    return error.message;
  }

  // String error
  if (typeof error === "string") {
    return error;
  }

  return DEFAULT_MESSAGE;
}

export default parseApiError;
