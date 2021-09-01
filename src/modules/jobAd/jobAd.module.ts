import { Module } from "@nestjs/common";
import { PrismaService } from "src/core/prisma.service";
import { JobAdResolver } from "./jobAd.resolver";
import { JobAdService } from "./jobAd.service";

@Module({
  providers: [JobAdResolver, JobAdService, PrismaService],
})
export class JobAdModule {}
