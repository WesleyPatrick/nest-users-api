import { Entity } from "../../entity";

type StubEntityProps = {
  prop1: string;
  prop2: number;
};

function uuidVerify(uuid: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(uuid);
}

class StubEntity extends Entity<StubEntityProps> {}

  describe('Abstract entity unit tests', () => {

  it('should set props and id', () => {
    const props = { prop1: 'prop1', prop2: 1 };

    const sut = new StubEntity(props);
    expect(sut.props).toEqual(props);
    expect(sut._id).toBeDefined();
    expect(uuidVerify(sut._id)).toBeTruthy();
  });
  
  it('should accept a valid uuid', () => {
    const props = { prop1: 'prop1', prop2: 1 };
    const uuid = '123e4567-e89b-12d3-a456-426614174000';
    const sut = new StubEntity(props, uuid);
    expect(uuidVerify(sut._id)).toBeTruthy();
    expect(sut._id).toBe(uuid);
  });

  it('should convert a entity to a JSON object', () => {
    const props = { prop1: 'prop1', prop2: 1 };
    const uuid = '123e4567-e89b-12d3-a456-426614174000';
    const sut = new StubEntity(props, uuid);
    expect(sut.toJSON()).toStrictEqual({
      id: uuid,
      ...props,
    });
  });
});

  