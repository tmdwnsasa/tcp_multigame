import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { createUser, findUserByDeviceID, updateUserLogin } from '../../db/user/user.db.js';
import { getGameSession } from '../../session/game.session.js';
import { addUser, getUserById } from '../../session/user.session.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { createResponse } from '../../utils/response/createResponse.js';

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId, playerId, latency } = payload;
    const game = getGameSession();

    let user = await findUserByDeviceID(deviceId);

    if (!user) {
      user = await createUser(deviceId);
    } else {
      await updateUserLogin(user.id);
    }

    console.log('deviceId : ' + deviceId + ', playerId : ' + playerId + ', latency : ' + latency);
    addUser(deviceId, playerId, socket);

    user = getUserById(userId);

    game.addUser(user);
    const initialResponse = createResponse(
      HANDLER_IDS.INITIAL,
      RESPONSE_SUCCESS_CODE,
      { userId: user.id },
      deviceId,
    );

    // 소켓을 통해 클라이언트에게 응답 메시지 전송
    socket.write(initialResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default initialHandler;
