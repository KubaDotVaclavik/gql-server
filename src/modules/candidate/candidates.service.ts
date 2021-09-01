import { Injectable } from "@nestjs/common";
import { CandidateCreateInput } from "./dto/candidateCreate.input";
import { CandidatesArgs } from "./dto/candidates.args";
import { PrismaService } from "../../core/prisma.service";
import { Prisma, Candidate } from "@prisma/client";

@Injectable()
export class CandidatesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CandidateCreateInput): Promise<Candidate> {
    return this.prisma.candidate.create({ data });
  }

  async findOneById(id: string): Promise<Candidate> {
    return this.prisma.candidate.findUnique({ where: { id } });
  }

  async findAll(args: CandidatesArgs): Promise<Candidate[]> {
    // const { where, ...args } = args;

    const where: Prisma.CandidateWhereInput = {};
    if (args.where?.fullNameContaines) {
      where.fullName = { contains: args.where?.fullNameContaines };
    }
    if (args.where?.skillsContaines) {
      where.skills = { contains: args.where?.skillsContaines };
    }
    if (args.where?.salaryMax || args.where?.salaryMin) {
      where.salary = {
        lte: args.where?.salaryMax || undefined,
        gte: args.where?.salaryMin || undefined,
      };
    }

    return this.prisma.candidate.findMany({
      skip: args.skip,
      take: args.take,
      ...args,
      where,
    });
  }

  async remove(id: string): Promise<Candidate> {
    return this.prisma.candidate.delete({ where: { id } });
  }
}
