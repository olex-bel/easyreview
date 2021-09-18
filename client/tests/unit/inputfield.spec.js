import { shallowMount } from '@vue/test-utils';
import InputField from "@/components/InputField.vue";

describe('InputField tests', () => {
    it('should support "text", "email", "number" types', () => {
        const validator = InputField.props.type.validator;

        expect(validator('text')).toBe(true);
        expect(validator('email')).toBe(true);
        expect(validator('number')).toBe(true);
    });

    it('should not support "checkbox" and "radio" types', () => {
        const validator = InputField.props.type.validator;

        expect(validator('checkbox')).toBe(false);
        expect(validator('radio')).toBe(false);
    });

    it('should render label if it is set in properties', () => {
        const wrapper = shallowMount(InputField, {
            propsData: {
                id: 'test',
                label: 'test',
            },
        });

        expect(wrapper.find('label').exists()).toBe(true)
    });

    it('should trigger input event with value', () => {
        const wrapper = shallowMount(InputField, {
            propsData: {
                id: 'test',
            },
        });
        const value = 'test';

        wrapper.find('input').setValue('test');

        expect(wrapper.emitted('input')).toBeTruthy();
        expect(wrapper.emitted('input')[0]).toEqual([value]);
    });
});