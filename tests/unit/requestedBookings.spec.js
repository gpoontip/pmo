import { mount } from '@vue/test-utils';
import BookingsTable from '@/components/BookingsTable.vue';

describe('BookingsTable', () => {
  const build = () => {
    const options = {};
    const wrapper = mount(BookingsTable, options);

    return {
      wrapper
    };
  };
  it('lists all requested bookings', async () => {
    // const { wrapper } = build();
    // await wrapper.setProps({ data: [{ name: 'abc' }, { name: 'def' }] });
    // expect(wrapper.find('tbody').findAll('tr').length).toBe(2);
  });
  it('lists all displays all data fields correctly', async () => {
    // const { wrapper } = build();
    // await wrapper.setProps({ data: [{ name: 'abc' }, { name: 'def' }] });
    // expect(wrapper.html()).toContain('abc');
    // expect(wrapper.html()).toContain('def');
  });
  it('filters by production name', () => {});
  it('filters by status', () => {});
  it('filters by date', () => {});
  it('tester role can only see assigned bookings', () => {});
  it('client admin role only see assigned production', () => {});
  it('booking admin role has access to all', () => {});
  it('medical admin role has access to all', () => {});
});
