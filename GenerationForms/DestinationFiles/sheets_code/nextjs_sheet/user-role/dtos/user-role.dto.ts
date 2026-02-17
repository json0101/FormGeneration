import BaseDto from "../../../commons/dtos/base.dto";

export default interface UserRoleDto extends BaseDto {

}

export interface UserRoleResumeDto extends BaseDto {
    description: string;
}