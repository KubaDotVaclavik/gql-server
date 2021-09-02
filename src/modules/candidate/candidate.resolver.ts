import { NotFoundException } from "@nestjs/common";
import {
  Args,
  Field,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { CandidateCreateInput } from "./dto/candidateCreate.input";
import { CandidatesArgs } from "./dto/candidates.args";
import { Candidate } from "./models/candidate.model";
import { CandidatesService } from "./candidates.service";
import { JobAd } from "../jobAd/models/jobAd.model";
import { JobAdService } from "../jobAd/jobAd.service";
import { PaginationArgs } from "../common/dto/pagination.args";
import { CandidateUpdateInput } from "./dto/candidateUpdate.input";
import { wait } from "src/core/utils";

@Resolver((of) => Candidate)
export class CandidatesResolver {
  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly jobAdService: JobAdService
  ) {}

  @Query((returns) => Candidate)
  async candidate(@Args("id") id: string): Promise<Candidate> {
    await wait(500);
    const candidate = await this.candidatesService.findOneById(id);
    if (!candidate) {
      throw new NotFoundException(id);
    }
    return candidate;
  }

  @Query((returns) => [Candidate])
  async candidates(
    @Args() candidatesArgs: CandidatesArgs
  ): Promise<Candidate[]> {
    await wait(500);
    return this.candidatesService.findAll(candidatesArgs);
  }

  @Mutation((returns) => Candidate)
  async createCandidate(
    @Args("createInput") createInput: CandidateCreateInput
  ): Promise<Candidate> {
    const candidate = await this.candidatesService.create(createInput);
    return candidate;
  }

  @Mutation((returns) => Candidate)
  async updateCandidate(
    @Args("id") id: string,
    @Args("updateInput") updateInput: CandidateUpdateInput
  ): Promise<Candidate> {
    await wait(500);
    const candidate = await this.candidatesService.update(id, updateInput);
    return candidate;
  }

  @Mutation((returns) => Candidate)
  async removeCandidate(@Args("id") id: string) {
    return this.candidatesService.remove(id);
  }

  @ResolveField("jobAds", (type) => [JobAd])
  async getJobAds(
    @Parent() candidate: Candidate,
    @Args() args: PaginationArgs
  ) {
    return this.jobAdService.findAllByCandidateId(candidate.id, args);
  }

  @ResolveField("fullName", (type) => String)
  async getFullName(
    @Parent() candidate: Candidate,
    @Args("uppercase", { nullable: true }) uppercase?: boolean
  ) {
    return uppercase ? candidate.fullName.toUpperCase() : candidate.fullName;
  }

  @ResolveField("random", (type) => String)
  async calcRandom() {
    return (Math.random() + 1).toString(36).substring(7);
  }
}
