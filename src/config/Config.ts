class Config {
    static getApiUrl() {
        let apiUrl = Config.getEnvVariable('NEXT_PUBLIC_API_URL');
        if (apiUrl.endsWith('/')) {
            apiUrl = apiUrl.slice(0, -1);
        }

        return apiUrl;
    }

    static getJwtSecret() {
        const jwtSecret = Config.getEnvVariable('NEXT_PUBLIC_JWT_SECRET');

        return jwtSecret;
    }

    private static getEnvVariable(name: string): string {
        const envVariable = process.env[name];
        if (!envVariable) {
            throw new Error(`${name} is not defined in the environment variables`);
        }

        return envVariable;
    }
}

export default Config;
