import { ValueAccessor } from './value-accessor';

describe('ValueAccessor', () => {
  let entity: ValueAccessor<string>;
  let spyFn: jasmine.Spy;
  let spyChanges: jasmine.Spy;

  beforeEach(() => {
    spyFn = jasmine.createSpy();
    spyChanges = jasmine.createSpy();
    entity = new ValueAccessor({ get: () => ({ detectChanges: spyChanges }) });
  });

  describe('When the value is set', () => {
    beforeEach(() => {
      entity.value = 'value';
    });

    it('should update the value', () => {
      expect(entity.value).toBe('value');
    });
  });

  describe('When the writeValue method is called', () => {
    beforeEach(() => {
      entity.writeValue('value');
    });

    it('should update the value', () => {
      expect(entity.value).toBe('value');
    });

    it('should call #detectChanges', () => {
      expect(spyChanges).toHaveBeenCalledWith();
    });
  });

  describe('When the registerOnChange method is called', () => {
    beforeEach(() => {
      entity.registerOnChange(spyFn);
      entity.value = 'value';
    });

    it('should return undefined', () => {
      expect(spyFn).toHaveBeenCalledWith('value');
    });
  });

  describe('When the registerOnTouched method is called', () => {
    beforeEach(() => {
      entity.registerOnTouched(spyFn);
    });

    it('should return undefined', () => {
      expect(entity.registerOnTouched).toBeDefined();
    });
  });
});
