const userResponse = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};

module.exports = userResponse;