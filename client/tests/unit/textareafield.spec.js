import { shallowMount } from '@vue/test-utils';
import TextareaField from "@/components/TextareaField.vue";

describe('TextareaField tests', () => {
    it('should render label if it is set in properties', () => {
        const wrapper = shallowMount(TextareaField, {
            propsData: {
                id: 'test',
                label: 'test',
            },
        });

        expect(wrapper.find('label').exists()).toBe(true)
    });

    it('should trigger input event with value', () => {
        const wrapper = shallowMount(TextareaField, {
            propsData: {
                id: 'test',
            },
        });
        const value = 'test';

        wrapper.find('textarea').setValue('test');

        expect(wrapper.emitted('input')).toBeTruthy();
        expect(wrapper.emitted('input')[0]).toEqual([value]);
    });
});