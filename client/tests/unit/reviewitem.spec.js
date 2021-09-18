import { shallowMount } from '@vue/test-utils';
import ReviewItem from '@/components/ReviewItem.vue';

jest.mock('vue-material-design-icons/Close.vue', () => ({}));
jest.mock('vue-material-design-icons/Check.vue', () => ({}));

describe('ReviewItem tests', () => {
    let reviewData;

    beforeEach(() => {
        reviewData = {
            rating: 1,
            title: 'test title',
            summary: 'test summary',
            isRecommend: false,
            created_at: '2020-11-20T23:32:18Z',
            nickname: '@testnickname',
        };
    });

    it('should render review-item-recommends-yes div', () => {

        reviewData.isRecommend = true;

        const wrapper = shallowMount(ReviewItem, {
            propsData: {
                review: reviewData,
            },
        });

        expect(wrapper.find('.review-item-recommends-yes').exists()).toBe(true);
        expect(wrapper.find('.review-item-recommends-no').exists()).toBe(false);
    });

    it('should render review-item-recommends-no div', () => {

        reviewData.isRecommend = false;

        const wrapper = shallowMount(ReviewItem, {
            propsData: {
                review: reviewData,
            },
        });

        expect(wrapper.find('.review-item-recommends-yes').exists()).toBe(false);
        expect(wrapper.find('.review-item-recommends-no').exists()).toBe(true);
    });

    it('should render title', () => {
        const wrapper = shallowMount(ReviewItem, {
            propsData: {
                review: reviewData,
            },
        });

        expect(wrapper.find('.review-item-title').text()).toEqual('test title');
    });

    it('should render summary', () => {
        const wrapper = shallowMount(ReviewItem, {
            propsData: {
                review: reviewData,
            },
        });

        expect(wrapper.find('.review-item-summary').text()).toEqual('test summary');
    });

    it('should render nickname', () => {
        const wrapper = shallowMount(ReviewItem, {
            propsData: {
                review: reviewData,
            },
        });

        expect(wrapper.find('.review-item-author').text()).toEqual('@testnickname');
    });
});
