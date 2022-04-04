export default async (ctx) => {
    const api = ctx.$axios.create({
        baseURL: ctx.$config.AWS_USER_PROFILE_API,
    });
    return {
        create: async ({
            username, email, city, state,
        }) => {
            if (!username || !email) {
                return new Error('Username and email are required!');
            }
            return api.$post('/users/', {
                username, email, city, state,
            });
        },
        update: async ({
            username, email, city, state,
        }) => {
            if (!username) {
                return new Error('Username is required!');
            }
            return api.$patch(`/users/${username}`, {
                email, city, state,
            });
        },
        delete: async (username) => {
            if (!username) {
                return new Error('Username is required!');
            }
            return api.$get(`/users/${username}`);
        },
        get: async (username) => {
            if (!username) {
                return new Error('Username is required!');
            }
            return api.$delete(`/users/${username}`);
        },
        search: async ({ city, state }) => {
            if (!city && !state) {
                return new Error('City or state is required!');
            }
            const params = new URLSearchParams({ city, state }).toString();

            return api.get(`/users?${params}`);
        },
        upload: async ({ username, file, progress }) => {
            const formData = new FormData();
            formData.append('file', file);

            return api.$post(`/users/${username}/uploads`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                progress,
            });
        },
    };
};
