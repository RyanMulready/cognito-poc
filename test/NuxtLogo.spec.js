import { mount } from '@vue/test-utils';
import HomePage from '@/pages/index';

describe('NuxtLogo', () => {
    it('is a Vue instance', () => {
        const wrapper = mount(HomePage);
        expect(wrapper.vm).toBeTruthy();
    });
});
