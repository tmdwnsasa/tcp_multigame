import { HANDLER_IDS } from '../constants/handlerIds.js';
import locationUpdateHandler from './game/location.handler.js';
import initialHandler from './user/initial.handler.js';

const handlers = {
  [HANDLER_IDS.INITIAL]: {
    handler: initialHandler,
    protoType: 'initialPacket.InitialPacket',
  },
  [HANDLER_IDS.UPDATELOCATION]: {
    handler: locationUpdateHandler,
    protoType: 'updateLocation.UpdateLocationPayload',
  },
};

export const getHandlerById = (handlerId) => {
  if (!handlers[handlerId]) {
    console.error(`핸들러를 찾을 수 없습니다: ID ${handlerId}`);
  }
  return handlers[handlerId].handler;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    console.error(`프로토타입을 찾을 수 없습니다: ID ${handlerId}`);
  }
  return handlers[handlerId].protoType;
};
