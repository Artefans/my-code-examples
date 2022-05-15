import {
  Scope,
  Application,
  ProcessSing,
  IProcessMeta,
  TokenAndKeys,
  FOPBaseResult,
  ProcessListDto,
  CheckBaseResult,
  CertificateFromCA,
  UpdateProcessStage,
  IProcessByStageCode,
  ICompleteProcessDto,
  KeyGenerationSuccess,
  ProcessDetainsOnStage,
  ProcessCustomerIdentification,
} from '#/types/onboarding/process';
import { CompleteStageCode, StageCode } from '#/types/onboarding/application';
import { IBaseService, IDataDto, IMetaDto } from '../../base.service';
import { ActionCode, BaseCode, Group, ResultCode } from '#/types/onboarding/base';
import { FOPCheckingBaseDetails, KEPOperation, PEPCheckingBaseDetails } from '#/types/onboarding/user-documents';
import {
  CustomerABSInfo,
  ISendStageResultOptions,
  ISendStageResultResponse,
  VerifyOPTResult,
} from '#/types/onboarding/bank-side';
import { IOTPVerify } from '#/types/card-account/pin-setup';

export interface IOnboardingService extends IBaseService {
  fetchProcessListInProgress(group: Group, page: number, pageSize: number): Promise<ProcessListDto>

  setProcessOcrCheckComplete(processId: string, data: IDataDto<ICompleteProcessDto>): Promise<IMetaDto<IProcessMeta>>

  setProcessByStageCodeComplete(processId: string, stageCode: CompleteStageCode, data: IDataDto<IProcessByStageCode>): Promise<IMetaDto<IProcessMeta>>

  setProcessCustomerIdentificationComplete(processId: string, data: IDataDto<ProcessCustomerIdentification>): Promise<IMetaDto<IProcessMeta>>

  setProcessResponsibleMyself(processId: string, stageCode: StageCode): Promise<string>

  updateProcessStage(processId: string, stageCode: StageCode, actionCode: ActionCode, data: IDataDto<UpdateProcessStage>): Promise<string>

  processStageSing(processId: string, stageCode: StageCode, data: ProcessSing): Promise<object>

  fetchProcessDetailsOnStage(processId: string, stageCode: StageCode): Promise<IDataDto<ProcessDetainsOnStage>>

  fetchApplicationData(applicationId: string): Promise<Application>

  downloadResourceData(applicationId: string, objectId: string): Promise<string>

  downloadCustomerSignatureImage(applicationId: string, access_key: string): Promise<string>

  downloadResource(scope: Scope, access_key: string): Promise<string>

  uploadResourceSignature(applicationId: string, objectId: string): Promise<string>

  uploadCheckBaseResult(applicationId: string, baseCode: BaseCode, data: IDataDto<CheckBaseResult>): Promise<string>

  updateFOPBaseResult(applicationId: string, data: IDataDto<FOPBaseResult>): Promise<string>

  updateFMBaseResult(applicationId: string, data: IDataDto<{ resultCode: ResultCode }>): Promise<string>

  updatePEPBaseResult(applicationId: string, data: IDataDto<{ resultCode: ResultCode }>): Promise<string>

  fetchPEPCheckingBaseDetails(applicationId: string): Promise<IDataDto<{ results: PEPCheckingBaseDetails[] }>>

  fetchFOPCheckingBaseDetails(applicationId: string): Promise<FOPCheckingBaseDetails>

  restartActionsOfProcess(processId: string, stageCode: StageCode): Promise<string>

  fetchInitialSettingsForKEPOperation(): Promise<KEPOperation>

  generateVirtualTokenAndKeys(data: TokenAndKeys): Promise<KeyGenerationSuccess>

  importCertificateFromCA(data: CertificateFromCA): Promise<string>

  getCustomerInfoFromABS(processId: string): Promise<IDataDto<CustomerABSInfo>>

  verifyEnteredOTP(options: IOTPVerify): Promise<VerifyOPTResult>

  sendStageResultData(processId: string, options: ISendStageResultOptions): Promise<IMetaDto<ISendStageResultResponse>>
}
