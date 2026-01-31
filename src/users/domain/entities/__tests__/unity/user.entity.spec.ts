import { userDataBuilder } from "../../../testing/helpers/user-data-builder";
import { UserEntity, type UserEntityProps } from "../../user.entity";
describe('UserEntity unit tests', () => {
  let sut: UserEntity;
  let props: UserEntityProps;

  beforeEach(() => {
    props = userDataBuilder({});  
    sut = new UserEntity(props);
  });
  it('Constructor method', () => {
    expect(sut.props).toEqual(props);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.password).toEqual(props.password);
  });

  it('name getter', () => {
    expect(sut.props.name).toBeDefined();
    expect(sut.props.name).toEqual(props.name);
    expect(typeof sut.props.name).toBe('string');
  });

  it('email getter', () => {
    expect(sut.props.email).toBeDefined();
    expect(sut.props.email).toEqual(props.email);
    expect(typeof sut.props.email).toBe('string');
  });

  it('password getter', () => {
    expect(sut.props.password).toBeDefined();
    expect(sut.props.password).toEqual(props.password);
    expect(typeof sut.props.password).toBe('string');
  });

  it('createdAt getter', () => {
    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });
});
