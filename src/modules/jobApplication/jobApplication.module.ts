import { Module } from "@nestjs/common";
import { PrismaService } from "src/core/prisma.service";
import { JobApplicationResolver } from "./jobApplication.resolver";
import { JobApplicationService } from "./jobApplication.service";

@Module({
  providers: [JobApplicationResolver, JobApplicationService, PrismaService],
})
export class JobApplicationModule {}
