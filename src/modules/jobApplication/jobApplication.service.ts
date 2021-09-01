import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma.service";
import { JobApplicationCreateInput } from "./dto/jobApplicationCreate.input";
import { JobApplicationsArgs } from "./dto/jobApplications.args";
import { JobApplication } from "./models/jobApplication.model";

@Injectable()
export class JobApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: JobApplicationCreateInput): Promise<JobApplication> {
    return this.prisma.jobApplication.create({ data });
  }

  async findOneById(id: string): Promise<JobApplication> {
    return this.prisma.jobApplication.findUnique({ where: { id } });
  }

  async findAll(args: JobApplicationsArgs): Promise<JobApplication[]> {
    return this.prisma.jobApplication.findMany(args);
  }

  async remove(id: string): Promise<JobApplication> {
    return this.prisma.jobApplication.delete({ where: { id } });
  }
}
