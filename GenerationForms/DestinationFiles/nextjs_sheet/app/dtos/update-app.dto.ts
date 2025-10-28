import CreateApplicationDto from "./create-app.dto";

export default interface ApplicationRoleDto extends CreateRoleDto {
    roleId: number;
}