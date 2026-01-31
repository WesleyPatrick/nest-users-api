import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from '../../env-config.service';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigModule } from '../../env-config.module';

describe('EnvConfigService', () => {
  let sut: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({
        isGlobal: true,
      })],
      providers: [EnvConfigService],
    }).compile();

    sut = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return the app port', () => {
    expect(sut.getAppPort()).toBe(3000);
  });

  it('should return the node environment', () => {
    expect(sut.getNodeEnv()).toBe('test');
  });
});
