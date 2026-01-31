import { userDataBuilder } from "../../../testing/helpers/user-data-builder";
import { UserEntity, type UserEntityProps } from "../../user.entity";
describe('UserEntity unit tests', () => {
  let sut: UserEntity;
  let props: UserEntityProps;

  beforeEach(() => {
    UserEntity.validate = jest.fn();
    props = userDataBuilder({});  
    sut = new UserEntity(props);
  });
  it('Constructor method', () => {
    expect(UserEntity.validate).toHaveBeenCalledWith(props);
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

  it('name setter', () => {
    sut['name'] = 'test';
    expect(sut.props.name).toEqual('test');
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

  it('password setter', () => {
    sut['password'] = 'test';
    expect(sut.props.password).toEqual('test');
  });

  it('createdAt getter', () => {
    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('update method', () => {
    sut.update('test');
    expect(sut.props.name).toEqual('test');
    expect(UserEntity.validate).toHaveBeenCalledWith({ ...props, name: 'test' });
  });

  it('updatePassword method', () => {
    sut.updatePassword('test');
    expect(sut.props.password).toEqual('test');
    expect(UserEntity.validate).toHaveBeenCalledWith({ ...props, password: 'test' });
  });
});
