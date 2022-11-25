import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthCheckController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  checkHealth() {
    return this.health.check([
      () => this.http.pingCheck('app', 'http://localhost:3000'),
      () => this.db.pingCheck('database', { timeout: 5000 }),
    ]);
  }
}
