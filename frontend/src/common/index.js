const backendDomain = "http://localhost:3005";

const SummaryApi = {
  SignUp: {
    url: `${backendDomain}/api/signup`, // Ensure this URL is correct
    method: "POST" // HTTP method should be uppercase
  }
};

export default SummaryApi;
