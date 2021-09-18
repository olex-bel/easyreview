import { shallowMount } from '@vue/test-utils';
import ReviewList from '@/components/ReviewList.vue';
import { getAllReviews } from '@/assets/js/easyreview';

jest.mock('@/assets/js/easyreview');
jest.mock('vue-material-design-icons/Close.vue', () => ({}));
jest.mock('vue-material-design-icons/Check.vue', () => ({}));

describe('ReviewList tests', () => {
    it('should not render content if reviews list is empty', async () => {
        getAllReviews.mockResolvedValue({
            reviews: [],
            pagination: {
                skip: 0,
                limit: 10,
                hasMoreReviews: false,
            }
        });
        const wrapper = shallowMount(ReviewList, {
            propsData: {
                productId: 'P001',
            },
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.isReviewsListEmpty).toBe(true);
        expect(wrapper.find('.reviews-actions').exists()).toBe(false);
        expect(wrapper.find('.reviews-list').exists()).toBe(false);
    });

    it('should render reviews list', async () => {
        getAllReviews.mockResolvedValue({
            reviews: [{}, {}, {}],
            pagination: {
                skip: 0,
                limit: 10,
                hasMoreReviews: false,
            }
        });
        const wrapper = shallowMount(ReviewList, {
            propsData: {
                productId: 'P001',
            },
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.isReviewsListEmpty).toBe(false);
        expect(wrapper.find('.reviews-actions').exists()).toBe(true);
        expect(wrapper.find('.reviews-list').exists()).toBe(true);
    });

    it('should update pagination after load data', async () => {
        getAllReviews.mockResolvedValue({
            reviews: [{}, {}, {}, {}, {}],
            pagination: {
                skip: 5,
                limit: 5,
                hasMoreReviews: true,
            }
        });
        const wrapper = shallowMount(ReviewList, {
            propsData: {
                productId: 'P001',
            },
        });

        expect(wrapper.vm.skip).toBe(0);
        expect(wrapper.vm.limit).toBe(10);
        expect(wrapper.vm.hasMoreReviews).toBe(false);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.skip).toBe(5);
        expect(wrapper.vm.limit).toBe(5);
        expect(wrapper.vm.hasMoreReviews).toBe(true);
    });

    it('should add reviews to the list if loadReviews called again', async () => {
        getAllReviews.mockResolvedValue({
            reviews: [{}, {}, {}, {}, {}],
            pagination: {
                skip: 5,
                limit: 5,
                hasMoreReviews: true,
            }
        });

        const wrapper = shallowMount(ReviewList, {
            propsData: {
                productId: 'P001',
            },
        });

        await wrapper.vm.$nextTick();
        expect(wrapper.vm.reviews.length).toBe(5);

        getAllReviews.mockResolvedValue({
            reviews: [{}, {}],
            pagination: {
                skip: 7,
                limit: 5,
                hasMoreReviews: false,
            }
        });

        wrapper.vm.loadReviews();
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.reviews.length).toBe(7);
    });

    it('should not fail if promise rejected', async () => {
        getAllReviews.mockRejectedValue(null);
        const wrapper = shallowMount(ReviewList, {
            propsData: {
                productId: 'P001',
            },
        });

        await wrapper.vm.$nextTick();
        expect(wrapper.vm.isReviewsListEmpty).toBe(true);
    });
});