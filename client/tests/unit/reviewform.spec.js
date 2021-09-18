import { shallowMount } from '@vue/test-utils';
import ReviewForm from "@/components/ReviewForm.vue";
import { addReview } from '@/assets/js/easyreview';

jest.mock('@/assets/js/easyreview');

describe('ReviewForm tests', () => {
    it('submit button should be disabled if required field are empty', () => {
        const wrapper = shallowMount(ReviewForm, {
            propsData: {
                productId: 'P001',
            },
        });

        expect(wrapper.vm.isSubmitDisabled).toBe(true);
    });

    it('submit set isSubmitted to true if data submitted', async () => {
        const wrapper = shallowMount(ReviewForm, {
            propsData: {
                productId: 'P001',
            },
        });

        addReview.mockResolvedValue({
            status: 'ok',
        });

        wrapper.setData({
            rating: 2,
            title: "test",
            summary: "test",
            nickname: "test",
            isRecommend: false,
            email: "test@test.com",
        });

        wrapper.vm.submitReview();

        await wrapper.vm.$nextTick();
        expect(wrapper.vm.isSubmitted).toBe(true);
    });

    it('submit set isSubmitError to true if submit failed', async () => {
        const wrapper = shallowMount(ReviewForm, {
            propsData: {
                productId: 'P001',
            },
        });

        addReview.mockRejectedValue({
            status: 'error',
        });

        wrapper.setData({
            rating: 2,
            title: "test",
            summary: "test",
            nickname: "test",
            isRecommend: false,
            email: "test@test.com",
        });

        wrapper.vm.submitReview();

        await wrapper.vm.$nextTick();
        expect(wrapper.vm.isSubmitError).toBe(true);
    });
});