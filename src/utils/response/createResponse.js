import { getProtoMessages } from '../../init/loadProtos.js';
import { config } from '../../config/config.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { HANDLER_IDS } from '../../constants/handlerIds.js';

export const createResponse = (handlerId, responseCode, data = null, userId) => {
  const protoMessages = getProtoMessages();
  const Response = protoMessages.response.Response;

  const responsePayload = {
    handlerId,
    responseCode,
    timestamp: Date.now(),
    data: data ? Buffer.from(JSON.stringify(data)) : null,
  };

  const buffer = Response.encode(responsePayload).finish();

  // 패킷 길이 정보를 포함한 버퍼 생성
  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(
    buffer.length + config.packet.totalLength + config.packet.typeLength,
    0,
  ); // 패킷 길이에 타입 바이트 포함

  // 패킷 타입 정보를 포함한 버퍼 생성
  const packetType = Buffer.alloc(config.packet.typeLength);
  if (handlerId === HANDLER_IDS.UPDATELOCATION) {
    packetType.writeUInt8(PACKET_TYPE.LOCATION, 0);
  } else {
    packetType.writeUInt8(PACKET_TYPE.NORMAL, 0);
  }

  // 길이 정보와 메시지를 함께 전송
  return Buffer.concat([packetLength, packetType, buffer]);
};
