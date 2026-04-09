// Serviceable pincodes - All India delivery (removed restrictions)
// Now accepting all valid 6-digit Indian pincodes
export const SERVICEABLE_PINCODES: string[] = [];

// Pincode format validation
export const isValidPincodeFormat = (pincode: string): boolean => {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
};

// Check if pincode is serviceable - Now all valid pincodes are serviceable
export const isServiceablePincode = (): boolean => {
  return true; // Accept all valid Indian pincodes
};

// Validate pincode (format + serviceable)
export const validatePincode = (pincode: string): {
  valid: boolean;
  message: string;
  isServiceable: boolean;
} => {
  const trimmedPincode = pincode.trim();

  if (!trimmedPincode) {
    return {
      valid: false,
      message: 'Pincode is required',
      isServiceable: false,
    };
  }

  if (!isValidPincodeFormat(trimmedPincode)) {
    return {
      valid: false,
      message: 'Please enter a valid 6-digit pincode',
      isServiceable: false,
    };
  }

  // All valid pincodes are now serviceable
  return {
    valid: true,
    message: 'Delivery available!',
    isServiceable: true,
  };
};

// Get city name from pincode (basic mapping - expand as needed)
export const getCityFromPincode = (pincode: string): string => {
  const prefix = pincode.substring(0, 3);

  const cityMap: Record<string, string> = {
    '400': 'Mumbai',
    '110': 'Delhi',
    '560': 'Bangalore',
    '411': 'Pune',
    '500': 'Hyderabad',
    '600': 'Chennai',
    '700': 'Kolkata',
    '380': 'Ahmedabad',
    '302': 'Jaipur',
    '226': 'Lucknow',
  };

  return cityMap[prefix] || 'Your City';
};
