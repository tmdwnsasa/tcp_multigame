import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { getGameSession } from '../../session/game.session.js';
import { addUser, getAllUsers, getUserById } from '../../session/user.session.js';
import { createLocationPacket } from '../../utils/notification/game.notification.js';
import { createResponse } from '../../utils/response/createResponse.js';

const updateLocationHandler = async ({ socket, userId, payload }) => {
  const { x, y } = payload;
  const game = getGameSession();

  if (!game) {
  }

  const user = getUserById(userId);
  if (user) {
    user.updatePosition(x, y);
  }
  console.log('!!!', game.getAllUserLocations(userId));
  let packet = createLocationPacket(game.getAllUserLocations(userId));
  // 소켓을 통해 클라이언트에게 응답 메시지 전송

  socket.write(packet);
};

export default updateLocationHandler;
