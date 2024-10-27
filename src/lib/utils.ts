const capitalizeCompanyName = (company: string) => {
  return company.substring(0, 1).toUpperCase() + company.substring(1);
};

export { capitalizeCompanyName };
