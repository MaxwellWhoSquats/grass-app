import axios from 'axios';

// Set default base URL if needed
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Include credentials in requests
axios.defaults.withCredentials = true;

export default axios;
