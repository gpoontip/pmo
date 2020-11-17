import { mount } from '@vue/test-utils';
import BookingForm from '@/components/BookingForm.vue';

describe('BookingForm.vue', () => {
  const build = () => {
    const options = {};
    const wrapper = mount(BookingForm, options);

    return {
      wrapper,
      testingDate: () => wrapper.find('.testing-date'),
      eventTime: () => wrapper.find('.event-time'),
      productionName: () => wrapper.find('.production-name'),
      groupTesting: () => wrapper.find('.testing-type-group'),
      numberOfPeople: () => wrapper.find('.number-of-people'),
      testingName: () => wrapper.find('.testing-name'),
      testingAddress: () => wrapper.find('.testing-address'),
      testingCity: () => wrapper.find('.testing-city'),
      testingProvince: () => wrapper.find('.testing-province'),
      testingPostalCode: () => wrapper.find('.testing-postal-code'),
      testeeFirstName: () => wrapper.findAll('.testee-first-name'),
      testeeLastName: () => wrapper.findAll('.testee-last-name'),
      testeeDob: () => wrapper.findAll('.testee-dob'),
      testeeMobile: () => wrapper.findAll('.testee-mobile'),
      testeeEmail: () => wrapper.findAll('.testee-email'),
      testeeAddress: () => wrapper.findAll('.testee-address'),
      testeeComments: () => wrapper.findAll('.testee-comments'),
      button: () => wrapper.find('button.submit'),
      saveTesteeButton: () => wrapper.findAll('button.save-testee'),
      testeeForms: () => wrapper.findAllComponents({ name: 'TesteeForm' })
    };
  };

  it('submits basic info correctly', async () => {
    const {
      wrapper,
      testingDate,
      eventTime,
      productionName,
      groupTesting,
      numberOfPeople,
      button
    } = build();

    testingDate().element.value = '2020-01-01';
    eventTime().element.value = '12:00:00';
    productionName().element.value = 'Production Name';
    numberOfPeople().element.value = '10';

    testingDate().trigger('input');
    eventTime().trigger('input');
    productionName().trigger('input');
    groupTesting().trigger('click');
    numberOfPeople().trigger('input');
    button().trigger('submit');

    expect(wrapper.emitted().submitted[0][0].date).toEqual('2020-01-01');
    expect(wrapper.emitted().submitted[0][0].time).toEqual('12:00:00');
    expect(wrapper.emitted().submitted[0][0].name).toEqual('Production Name');
    expect(wrapper.emitted().submitted[0][0].type).toEqual('group');
    expect(wrapper.emitted().submitted[0][0].amount).toEqual('10');
  });

  it('saves testing location', () => {
    const {
      wrapper,
      testingName,
      testingAddress,
      testingCity,
      testingProvince,
      testingPostalCode,
      button
    } = build();

    testingName().element.value = 'Testing Name';
    testingAddress().element.value = '12 Ave SW';
    testingCity().element.value = 'Calgary';
    testingProvince().element.value = 'AB';
    testingPostalCode().element.value = 'T2R 0J5';

    testingName().trigger('input');
    testingAddress().trigger('input');
    testingCity().trigger('input');
    testingProvince().trigger('input');
    testingPostalCode().trigger('input');
    button().trigger('submit');

    expect(wrapper.emitted().submitted[0][0].location.name).toEqual(
      'Testing Name'
    );
    expect(wrapper.emitted().submitted[0][0].location.address).toEqual(
      '12 Ave SW'
    );
    expect(wrapper.emitted().submitted[0][0].location.city).toEqual('Calgary');
    expect(wrapper.emitted().submitted[0][0].location.province).toEqual('AB');
    expect(wrapper.emitted().submitted[0][0].location.postalCode).toEqual(
      'T2R 0J5'
    );
  });

  it('saves the correct number of testess', async () => {
    const { wrapper, numberOfPeople, saveTesteeButton } = build();
    numberOfPeople().element.value = '2';
    await numberOfPeople().trigger('input');
    saveTesteeButton()[0].trigger('submit');
    saveTesteeButton()[1].trigger('submit');
    expect(wrapper.emitted().submitted[0][0].testees.length).toEqual(2);
  });

  it('displays correct amount of testee forms', async () => {
    const { numberOfPeople, testeeFirstName } = build();

    numberOfPeople().element.value = '2';
    await numberOfPeople().trigger('input');
    expect(testeeFirstName().length).toBe(2);

    numberOfPeople().element.value = 'c';
    await numberOfPeople().trigger('input');
    expect(testeeFirstName().length).toBe(0);
  });

  it('displays testee data on Save', async () => {
    const {
      wrapper,
      numberOfPeople,
      saveTesteeButton,
      testeeFirstName
    } = build();

    numberOfPeople().element.value = '2';
    await numberOfPeople().trigger('input');

    testeeFirstName()[1].element.value = 'Gary';
    testeeFirstName()[1].trigger('input');

    await saveTesteeButton()[1].trigger('submit');

    expect(wrapper.find('.testee2 .testee-info').html()).toContain('Gary');
  });

  it('emits testee data on Save', async () => {
    const {
      numberOfPeople,
      saveTesteeButton,
      testeeFirstName,
      testeeForms
    } = build();

    numberOfPeople().element.value = '2';
    await numberOfPeople().trigger('input');

    testeeFirstName()[1].element.value = 'Gary';
    testeeFirstName()[1].trigger('input');

    await saveTesteeButton()[1].trigger('submit');

    expect(testeeForms()[1].emitted().submitted[0][0].firstName).toEqual(
      'Gary'
    );
  });
});
