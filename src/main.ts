import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { DurationInterceptor } from "./interceptors/duration/duration.interceptor";
import * as dotenv from 'dotenv'
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const corsOptions = {
  //   origin: ['http://localhost:4200'],
  // };
  // app.enableCors(corsOptions);
  //app.use(morgan('dev'));
  app.use((req: Request, res: Response, next: () => void) => {
    console.log('from main ts  ');
    next();
  });
  //app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalInterceptors(new DurationInterceptor())
  await app.listen(process.env.APP_PORT);
}
bootstrap();
