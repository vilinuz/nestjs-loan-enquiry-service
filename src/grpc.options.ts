import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50050',
    package: 'loan',
    protoPath: join(__dirname, 'loan', 'loan.proto'),
  },
};
