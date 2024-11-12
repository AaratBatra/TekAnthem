import axios from "axios";
import { performLogout } from "@/store/slices/AuthSlice";

// Function to set up Axios interceptors
export const setupAxiosInterceptors = (dispatch) => {
	axios.defaults.baseURL =
		import.meta.env.VITE_API_URL || "http://3.218.234.95:8080/v1/";
	axios.defaults.headers.post["Content-Type"] = "application/json";

	axios.interceptors.request.use(
		(_config) => {
			const token = localStorage.getItem("token");
			if (token) {
				_config.headers.Authorization = `Bearer ${token}`;
			} else {
				dispatch(performLogout()); // Dispatch logout if no token
			}
			return _config;
		},
		(_error) => {
			return Promise.reject(_error);
		}
	);

	axios.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			const status = error?.response?.status;

			if (status === 401) {
				dispatch(performLogout()); // Dispatch logout on 401 or 403
			}

			return Promise.reject(error);
		}
	);
};
