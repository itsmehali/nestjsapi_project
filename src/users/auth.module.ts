// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthController } from './users.controller';
// import { AuthService } from './auth.service';
// import { User } from './user.entity';
// //import { GoogleStrategy } from './utils/GoogleStrategy';
// //import { SessionSerializer } from './utils/Serializer';
// import { JwtModule } from '@nestjs/jwt';
// require('dotenv').config();

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([User]),
//     JwtModule.register({
//       secret: process.env.JWT_SECRET,
//       signOptions: { expiresIn: '1d' },
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [
//     // GoogleStrategy,
//     //SessionSerializer,
//     AuthService,
//     {
//       provide: 'AUTH_SERVICE',
//       useClass: AuthService,
//     },
//   ],
// })
// export class AuthModule {}
