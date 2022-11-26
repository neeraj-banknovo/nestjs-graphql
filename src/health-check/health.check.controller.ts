import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ConfigKey } from '../common/enums';
import { AppConfig } from '../config/config.interface';

@Controller('health')
export class HealthCheckController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private config: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  checkHealth() {
    return this.health.check([
      () => this.http.pingCheck('app', this.getServiceUrl()),
      () => this.db.pingCheck('database', { timeout: 5000 }),
    ]);
  }

  private getServiceUrl(): string {
    const appPort = this.config.get<AppConfig>(ConfigKey.App).port;
    return `http://localhost:${appPort}/api`;
  }
}
