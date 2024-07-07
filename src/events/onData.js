import { config } from '../config/config.js';
import { PACKET_TYPE } from '../constants/header.js';
import { getHandlerById } from '../handlers/index.js';
import { packetParser } from '../utils/parser/packetParser.js';

export const onData = (socket) => async (data) => {
  // 기존 버퍼에 새로 수신된 데이터를 추가
  socket.buffer = Buffer.concat([socket.buffer, data]);

  const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;

  while (socket.buffer.length >= totalHeaderLength) {
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8(config.packet.totalLength);

    if (socket.buffer.length >= length) {
      const packet = socket.buffer.slice(totalHeaderLength, length);
      socket.buffer = socket.buffer.slice(length);

      //패킷 확인용 코드
      //console.log(`length: ${length}`);
      //console.log(`packetType: ${packetType}`);
      //console.log(packet);

      switch (packetType) {
        case PACKET_TYPE.PING:
          break;
        case PACKET_TYPE.NORMAL:
          const { handlerId, payload, userId } = packetParser(packet);

          const handler = getHandlerById(handlerId);
          await handler({
            socket,
            userId,
            payload,
          });
      }
    } else {
      // 아직 전체 패킷이 도착하지 않음
      break;
    }
  }
};
