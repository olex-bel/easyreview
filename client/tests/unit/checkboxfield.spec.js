import { shallowMount } from '@vue/test-utils';
import CheckboxField from "@/components/CheckboxField.vue";

describe('CheckboxField tests', () => {
    it('should trigger input event with value equal true', () => {
        const wrapper = shallowMount(CheckboxField, {
            propsData: {
                id: 'test',
                label: 'test',
            },
        });

        wrapper.find('input').setChecked(true);

        expect(wrapper.emitted('input')).toBeTruthy();
        expect(wrapper.emitted('input')[0]).toEqual([true]);
    });

    it('should trigger input event with value equal false', () => {
        const wrapper = shallowMount(CheckboxField, {
            propsData: {
                id: 'test',
                label: 'test',
                value: true,
            },
        });

        expect(wrapper.find('input').element).toBeTruthy();
        wrapper.find('input').setChecked(false);

        expect(wrapper.emitted('input')).toBeTruthy();
        expect(wrapper.emitted('input')[0]).toEqual([false]);
    });
});