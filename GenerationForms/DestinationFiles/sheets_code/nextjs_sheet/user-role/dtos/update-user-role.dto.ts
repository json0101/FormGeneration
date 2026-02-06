import CreateUserRoleDto from "./create-user-role.dto";

export default interface UpdateUserRoleDto extends CreateUserRoleDto {
    userRoleId: number;
}