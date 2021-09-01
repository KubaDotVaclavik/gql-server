import { Module } from "@nestjs/common";
import { CandidatesResolver } from "./candidate.resolver";
import { CandidatesService } from "./candidates.service";
import { PrismaService } from "../../core/prisma.service";
import { JobAdService } from "../jobAd/jobAd.service";

@Module({
  providers: [CandidatesResolver, CandidatesService, PrismaService, JobAdService],
})
export class CandidateModule {}
