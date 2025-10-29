import CreateApplicationDto from "./create-app.dto";

export default interface UpdateApplicationDto extends CreateApplicationDto {
    appId: number;
}