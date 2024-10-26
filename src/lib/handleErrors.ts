const handleErrorStatuses = (status: number) => {
  switch (status) {
    case 401:
      throw new Error('401, Unauthorized');
    case 404:
      throw new Error('404, Not Found');
    case 500:
      throw new Error('500, Internal Server Error');
    default:
      throw new Error(status.toString());
  }
};

export { handleErrorStatuses };
