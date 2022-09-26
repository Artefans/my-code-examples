export interface _sorryName0 extends IBaseService {
  _sorryName1(group: Group, page: number, pageSize: number): Promise<ProcessListDto>

  _sorryName2(processId: string, data: IDataDto<ICompleteProcessDto>): Promise<IMetaDto<IProcessMeta>>

  _sorryName3(processId: string, stageCode: CompleteStageCode, data: IDataDto<IProcessByStageCode>): Promise<IMetaDto<IProcessMeta>>

  _sorryName4(processId: string, data: IDataDto<ProcessCustomerIdentification>): Promise<IMetaDto<IProcessMeta>>

  _sorryName5(processId: string, stageCode: StageCode): Promise<string>

  _sorryName6(processId: string, stageCode: StageCode, actionCode: ActionCode, data: IDataDto<UpdateProcessStage>): Promise<string>

  _sorryName7(processId: string, stageCode: StageCode, data: ProcessSing): Promise<object>

  _sorryName8(processId: string, stageCode: StageCode): Promise<IDataDto<ProcessDetainsOnStage>>

  _sorryName9(applicationId: string): Promise<Application>

  _sorryName10(processId: string, options: ISendStageResultOptions): Promise<IMetaDto<ISendStageResultResponse>>
}
