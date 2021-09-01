import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma.service";
import { PaginationArgs } from "../common/dto/pagination.args";
import { JobAdCreateInput } from "./dto/jobAdCreate.input";
import { JobAdUpdateInput } from "./dto/jobAdUpdate.input";
import { JobAd } from "./models/jobAd.model";

@Injectable()
export class JobAdService {
  constructor(private prisma: PrismaService) {}

  async create(data: JobAdCreateInput): Promise<JobAd> {
    return this.prisma.jobAd.create({ data });
  }

  async update(id: string, data: JobAdUpdateInput): Promise<JobAd> {
    return this.prisma.jobAd.update({ where: { id }, data });
  }

  async findOneById(id: string): Promise<JobAd> {
    return this.prisma.jobAd.findUnique({ where: { id } });
  }

  async findAll(args: PaginationArgs): Promise<JobAd[]> {
    return this.prisma.jobAd.findMany(args);
  }

  async findAllByCandidateId(
    candidateId: string,
    args: PaginationArgs
  ): Promise<JobAd[]> {
    return this.prisma.jobAd.findMany({
      where: { Application: { some: { candidateId } } },
      ...args,
    });
  }

  async remove(id: string): Promise<JobAd> {
    return this.prisma.jobAd.delete({ where: { id } });
  }
}
