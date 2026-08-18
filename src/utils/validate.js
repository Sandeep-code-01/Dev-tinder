const validator = require("validator");


// ==================== SIGNUP VALIDATION ====================

const validateSignUpData = (req) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;

  // Required fields
  if (!firstName || !lastName || !email || !password) {
    throw new Error(
      "First name, last name, email and password are required"
    );
  }

  // First name validation
  if (firstName.length < 4 || firstName.length > 10) {
    throw new Error(
      "First name must be between 4 and 10 characters"
    );
  }

  // Last name validation
  if (lastName.length < 4 || lastName.length > 10) {
    throw new Error(
      "Last name must be between 4 and 10 characters"
    );
  }

  // Email validation
  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email");
  }

  // Password validation
  if (password.length < 6) {
    throw new Error(
      "Password must be at least 6 characters long"
    );
  }

  return true;
};


// ==================== PATCH VALIDATION ====================

const validateEditProfileData = (req) => {
  const allowedUpdates = [
    "firstName",
    "lastName",
    "password",
  ];

  const requestedFields = Object.keys(req.body);

  // Check allowed fields
  const isValidUpdate = requestedFields.every((field) =>
    allowedUpdates.includes(field)
  );

  if (!isValidUpdate) {
    throw new Error("Invalid update field");
  }

  // Don't allow empty PATCH request
  if (requestedFields.length === 0) {
    throw new Error("At least one field is required for update");
  }

  // First name validation
  if (req.body.firstName !== undefined) {
    if (
      req.body.firstName.length < 4 ||
      req.body.firstName.length > 10
    ) {
      throw new Error(
        "First name must be between 4 and 10 characters"
      );
    }
  }

  // Last name validation
  if (req.body.lastName !== undefined) {
    if (
      req.body.lastName.length < 4 ||
      req.body.lastName.length > 10
    ) {
      throw new Error(
        "Last name must be between 4 and 10 characters"
      );
    }
  }

  // Password validation
  if (req.body.password !== undefined) {
    if (req.body.password.length < 6 || req.body.password.specialChar === false) {
      throw new Error(
        "Password must be at least 6 characters long"
      );
    }
  }

  return true;
};


module.exports = {
  validateSignUpData,
  validateEditProfileData,
};