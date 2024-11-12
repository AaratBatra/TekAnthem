export default async function handler(req, res) {
	const backendUrl = `http://3.218.234.95:8080/v1${req.url.replace(
		"/api/proxy",
		""
	)}`;

    console.log(backendUrl);

	try {
		const response = await fetch(backendUrl, {
			method: req.method,
			headers: {
				...req.headers,
				//host: "your-backend-url", // or any custom headers needed by your backend
			},
			body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
		});

		// Relay response from backend to the client
		const data = await response.json();
		res.status(response.status).json(data);
	} catch (error) {
		res.status(500).json({ error: "Failed to connect to backend" });
	}
}
