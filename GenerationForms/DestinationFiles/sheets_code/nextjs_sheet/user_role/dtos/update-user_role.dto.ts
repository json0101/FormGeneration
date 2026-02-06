import CreateUserRoleDto from "./create-user_role.dto";

export default interface UpdateUserRoleDto extends CreateUserRoleDto {
    userRoleId: number;
}