import cognito from '@/api/cognito';
import profile from '@/api/profile';

export default async (ctx, inject) => {
    const token = localStorage.getItem('token');
    // Set token when defined
    if (token) {
        ctx.$axios.setToken(token, 'Bearer');
    }

    // Initialize API repositories
    const api = {
        auth: await cognito(ctx),
        profile: await profile(ctx),
    };

    ctx.$api = api;

    inject('api', api);
};
