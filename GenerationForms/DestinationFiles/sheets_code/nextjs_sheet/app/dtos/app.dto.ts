import BaseDto from "../../../commons/dtos/base.dto";

export default interface ApplicationDto extends BaseDto {

}

export interface ApplicationResumeDto extends BaseDto {
    description: string;
}