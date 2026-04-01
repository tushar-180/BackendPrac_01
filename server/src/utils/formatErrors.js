export const formatZodErrors = (error) => {
    // console.log(error)
  const formatted = {};

  error.issues.forEach((err) => {
    const field = err.path[0];
    formatted[field] = err.message;
  });

  return formatted;
};