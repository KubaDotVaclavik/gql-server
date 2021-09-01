import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JobApplicationCreateInput } from "./dto/jobApplicationCreate.input";
import { JobApplicationsArgs } from "./dto/jobApplications.args";
import { JobApplication } from "./models/jobApplication.model";
import { JobApplicationService } from "./jobApplication.service";

@Resolver((of) => JobApplication)
export class JobApplicationResolver {
  constructor(private readonly jobApplicationsService: JobApplicationService) {}

  @Query((returns) => JobApplication)
  async jobApplication(@Args("id") id: string): Promise<JobApplication> {
    const jobApplication = await this.jobApplicationsService.findOneById(id);
    if (!jobApplication) {
      throw new NotFoundException(id);
    }
    return jobApplication;
  }

  @Query((returns) => [JobApplication])
  jobApplications(
    @Args() jobApplicationsArgs: JobApplicationsArgs
  ): Promise<JobApplication[]> {
    return this.jobApplicationsService.findAll(jobApplicationsArgs);
  }

  @Mutation((returns) => JobApplication)
  async createJobApplication(
    @Args("createInput") createInput: JobApplicationCreateInput
  ): Promise<JobApplication> {
    return this.jobApplicationsService.create(createInput);
  }

  @Mutation((returns) => Boolean)
  async removeJobApplication(@Args("id") id: string) {
    return this.jobApplicationsService.remove(id);
  }
}
