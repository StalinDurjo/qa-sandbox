import MockRequest from './mock-request';
import {MockRequestRegistry} from "@src/service/mock-request/mock-registry";

export const mockRequestRegistry = new MockRequestRegistry()
mockRequestRegistry.autoLoad()
export const mockRequest = new MockRequest();
