import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CandidateModule } from './modules/candidate/candidate.module';
import { JobAdModule } from './modules/jobAd/jobAd.module';
import { JobApplicationModule } from './modules/jobApplication/jobApplication.module';

@Module({
  imports: [
    CandidateModule,
    JobAdModule,
    JobApplicationModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule {}