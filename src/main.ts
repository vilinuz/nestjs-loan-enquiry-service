import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { grpcClientOptions } from './grpc.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(grpcClientOptions);
  await app.startAllMicroservices();
}

bootstrap().then(() => {
  Logger.log(`🚀 Application is running on port 50050`);
});
