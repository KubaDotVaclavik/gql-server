import { NotFoundException } from "@nestjs/common";
import { Args, Mutation, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { JobAdCreateInput } from "./dto/jobAdCreate.input";
import { JobAd } from "./models/jobAd.model";
import { JobAdService } from "./jobAd.service";
import { JobAdUpdateInput } from "./dto/jobAdUpdate.input";
import { PaginationArgs } from "../common/dto/pagination.args";
import { wait } from "src/core/utils";

@Resolver((of) => JobAd)
export class JobAdResolver {
  constructor(private readonly jobAdsService: JobAdService) {}

  @Query((returns) => JobAd)
  async jobAd(@Args("id") id: string): Promise<JobAd> {
    const jobAd = await this.jobAdsService.findOneById(id);
    if (!jobAd) {
      throw new NotFoundException(id);
    }
    return jobAd;
  }

  @Query((returns) => [JobAd])
  async jobAds(@Args() args: PaginationArgs): Promise<JobAd[]> {
    await wait(500);
    return this.jobAdsService.findAll(args);
  }

  @Mutation((returns) => JobAd)
  async createJobAd(
    @Args("createInput") createInput: JobAdCreateInput
  ): Promise<JobAd> {
    const jobAd = await this.jobAdsService.create(createInput);
    return jobAd;
  }

  @Mutation((returns) => JobAd)
  async updateJobAd(
    @Args("id") id: string,
    @Args("updateInput") updateInput: JobAdUpdateInput
  ): Promise<JobAd> {
    return this.jobAdsService.update(id, updateInput);
  }

  @Mutation((returns) => Boolean)
  async removeJobAd(@Args("id") id: string) {
    return this.jobAdsService.remove(id);
  }

  @ResolveField("random", (type) => String)
  async calcRandom() {
    return (Math.random() + 1).toString(36).substring(7);
  }
}
